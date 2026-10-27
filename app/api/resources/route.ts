import { NextResponse } from 'next/server'
import nonprofitDirectory from '@/data/large-nonprofits.json'
import northCarolinaNonprofits from '@/data/nc-nonprofits.json'

const NOMINATIM = 'https://nominatim.openstreetmap.org/search'
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]

const categoryTags: Record<string, string[]> = {
  food: ['amenity=food_bank', 'amenity=soup_kitchen', 'social_facility=food_bank', 'office=ngo'],
  shelter: ['social_facility=shelter', 'social_facility=homeless_shelter', 'amenity=hostel', 'office=ngo'],
  health: ['amenity=clinic', 'amenity=hospital', 'healthcare=clinic', 'healthcare=hospital'],
  housing: ['social_facility=outreach', 'social_facility=group_home', 'office=ngo'],
  transportation: ['amenity=taxi', 'amenity=bus_station', 'amenity=car_rental'],
  youth: ['social_facility=day_care', 'amenity=kindergarten', 'amenity=childcare'],
  supplies: ['shop=charity', 'shop=second_hand', 'amenity=clothes_bank'],
  'mental-health': ['healthcare=psychotherapist', 'healthcare=psychiatrist', 'amenity=clinic'],
  'domestic-violence': ['social_facility=outreach', 'office=ngo'],
  disability: ['social_facility=outreach', 'healthcare=clinic', 'office=ngo'],
  financial: ['office=ngo', 'office=administrative'],
  disaster: ['office=ngo', 'social_facility=outreach'],
  other: ['office=ngo'],
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim()
  const latitudeParam = searchParams.get('lat')
  const longitudeParam = searchParams.get('lon')
  const requestedLatitude = Number(latitudeParam)
  const requestedLongitude = Number(longitudeParam)
  const hasCoordinates = latitudeParam !== null && longitudeParam !== null && latitudeParam !== '' && longitudeParam !== '' && Number.isFinite(requestedLatitude) && Number.isFinite(requestedLongitude)
  const radius = Math.min(Number(searchParams.get('radius') || 10), 50)
  const categories = (searchParams.get('categories') || 'food,shelter').split(',').filter(Boolean)
  if (!query && !hasCoordinates) return NextResponse.json({ error: 'Location is required' }, { status: 400 })

  let places: Array<{ lat: string; lon: string; display_name: string }>
  if (hasCoordinates) {
    places = [{ lat: String(requestedLatitude), lon: String(requestedLongitude), display_name: query || 'Current location' }]
  } else {
    const geoResponse = await fetch(`${NOMINATIM}?format=jsonv2&limit=1&q=${encodeURIComponent(query!)}`, { headers: { 'User-Agent': 'RelayGrid community resource finder' }, next: { revalidate: 3600 } })
    if (!geoResponse.ok) return NextResponse.json({ error: 'Location lookup failed' }, { status: 502 })
    places = await geoResponse.json()
    if (!places[0]) return NextResponse.json({ error: 'Location not found' }, { status: 404 })
  }
  const latitude = Number(places[0].lat)
  const longitude = Number(places[0].lon)
  const meters = radius * 1609.34
  const clauses = [...new Set(categories.flatMap((category) => categoryTags[category] || []))]
  const selectors = clauses.length ? clauses.map((tag) => `{nwr[${tag.split('=')[0]}=${tag.split('=')[1]}](around:${meters},${latitude},${longitude});}`).join('') : `{nwr[amenity](around:${meters},${latitude},${longitude});}`
  const broadSelectors = `{nwr[social_facility](around:${meters},${latitude},${longitude});}{nwr[healthcare](around:${meters},${latitude},${longitude});}{nwr[amenity=food_bank](around:${meters},${latitude},${longitude});}{nwr[amenity=soup_kitchen](around:${meters},${latitude},${longitude});}{nwr[office=ngo](around:${meters},${latitude},${longitude});}{nwr[shop=charity](around:${meters},${latitude},${longitude});}`
  let data: { elements?: any[] } = { elements: [] }
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const query = `[out:json][timeout:25];(${selectors}${broadSelectors});out center tags;`
      const overpass = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'RelayGrid community resource finder' }, body: `data=${encodeURIComponent(query)}`, signal: AbortSignal.timeout(8000) })
      if (overpass.ok) {
        data = await overpass.json()
        if ((data.elements || []).length > 0) break
      }
    } catch {
      // Try the next public OpenStreetMap endpoint.
    }
  }
  const osmResources = (data.elements || []).filter((item: any) => item.tags?.name && item.tags.name.length > 1).map((item: any) => {
    const tags = item.tags
    const point = item.center || item
    const tagText = Object.entries(tags).map(([key, value]) => `${key}=${value}`).join(' ').toLowerCase()
    const matched = categories.filter((category) => (categoryTags[category] || []).some((tag) => tagText.includes(tag.toLowerCase())))
    const inferred = matched.length ? matched : categories.filter((category) => {
      const keywords = category === 'shelter' ? ['shelter', 'homeless', 'refuge'] : category === 'food' ? ['food', 'meal', 'pantry', 'kitchen'] : category === 'health' ? ['health', 'clinic', 'hospital'] : category === 'mental-health' ? ['mental', 'counsel'] : category === 'youth' ? ['youth', 'child', 'family'] : category === 'housing' ? ['housing', 'home'] : category === 'disaster' ? ['disaster', 'relief'] : category === 'supplies' ? ['charity', 'thrift', 'clothing'] : []
      return keywords.some((keyword) => tagText.includes(keyword))
    })
    const address = [tags['addr:housenumber'], tags['addr:street'], tags['addr:city'], tags['addr:postcode']].filter(Boolean).join(' ') || places[0].display_name
    return { id: `osm-${item.type}-${item.id}`, name: tags.name, description: tags.description || 'Community resource listed in OpenStreetMap.', categories: inferred.length ? inferred : categories.slice(0, 1), tags: ['local', 'openstreetmap'], latitude: Number(point.lat), longitude: Number(point.lon), address, phone: tags.phone || tags['contact:phone'] || '', website: (tags.website || tags['contact:website'] || '').replace(/^https?:\/\//, ''), hours: tags.opening_hours || 'Hours not listed', eligibility: 'Contact the organization for eligibility and availability.', verified: false, source: 'OpenStreetMap', updated: 'Live map data' }
  })
  // The curated directory is intentionally global: users can browse the full
  // country-wide set while the map and distance labels provide local context.
  // North Carolina entries surface local Charlotte-area and statewide support.
  const directoryResources = [...nonprofitDirectory, ...northCarolinaNonprofits]
    .filter((organization) => organization.categories.some((category) => categories.includes(category)))
  const resources = [...directoryResources, ...osmResources]
  return NextResponse.json({ location: { latitude, longitude, label: places[0].display_name }, resources })
}
