'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { categories, type Organization } from '@/lib/relay-grid-data'
import { markerStyles } from '@/lib/map-markers'

type Props = { results: (Organization & { distance: number })[]; location: { latitude: number; longitude: number }; radius: number; onSelect: (org: Organization) => void }

function markerDetails(org: Organization) {
  const category = org.categories[0] || 'other'
  const style = markerStyles[category] || markerStyles.other
  const label = categories.find((item) => item.id === category)?.shortLabel || 'Community resource'
  return { ...style, label }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!)
}

function pinIcon(org: Organization) {
  const { color, emoji } = markerDetails(org)
  return L.divIcon({
    className: 'relay-pin-marker',
    html: `<div class="relay-pin" style="--relay-pin:${color}"><svg viewBox="0 0 38 46" aria-hidden="true"><path d="M19 2C10.2 2 3 9.2 3 18c0 12.4 16 26 16 26s16-13.6 16-26C35 9.2 27.8 2 19 2Z" fill="${color}" stroke="#fff" stroke-width="2.5"/><circle cx="19" cy="18" r="11.5" fill="#fff"/></svg><span class="relay-pin-emoji" aria-hidden="true">${emoji}</span></div>`,
    iconSize: [38, 46],
    iconAnchor: [19, 46],
    tooltipAnchor: [0, -44],
  })
}

function tooltipContent(org: Organization & { distance: number }) {
  const { emoji, label } = markerDetails(org)
  return `<strong>${escapeHtml(org.name)}</strong><span>${emoji} ${label} · ${org.distance.toFixed(1)} mi away</span>`
}

function zoomForRadius(radius: number) {
  return Math.max(3, Math.min(14, Math.round(14 - Math.log2(Math.max(radius, 1)))))
}

export function LiveMap({ results, location, radius, onSelect }: Props) {
  const [mapSatellite, setMapSatellite] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const instance = useRef<L.Map | null>(null)
  const markers = useRef<L.LayerGroup | null>(null)
  const tile = useRef<L.TileLayer | null>(null)
  useEffect(() => {
    if (!mapRef.current || instance.current) return
    const map = L.map(mapRef.current, { zoomControl: true }).setView([location.latitude, location.longitude], 10)
    tile.current = L.tileLayer('', { attribution: '' }).addTo(map)
    instance.current = map
    markers.current = L.layerGroup().addTo(map)
    return () => { map.remove(); instance.current = null }
  }, [location.latitude, location.longitude])
  useEffect(() => {
    const map = instance.current
    if (!map || !markers.current) return
    tile.current?.remove()
    tile.current = mapSatellite
      ? L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles © Esri' })
      : L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' })
    tile.current.addTo(map)
    map.setView([location.latitude, location.longitude], zoomForRadius(radius))
    markers.current.clearLayers()
    L.marker([location.latitude, location.longitude], { icon: L.divIcon({ className: 'relay-location', html: '<span></span>', iconSize: [24, 24], iconAnchor: [12, 12] }) }).addTo(markers.current).bindTooltip('Your search location')
    results.forEach((org) => L.marker([org.latitude, org.longitude], { icon: pinIcon(org), title: org.name, alt: org.name }).addTo(markers.current!).bindTooltip(tooltipContent(org), { direction: 'top', className: 'relay-tooltip', opacity: 1 }).on('click', () => onSelect(org)))
  }, [location, results, mapSatellite, onSelect])
  return <div className="relative"><div ref={mapRef} className="min-h-[330px] overflow-hidden rounded-2xl border border-[#cbded9] md:min-h-[430px]" aria-label={`${mapSatellite ? 'Satellite' : 'Street'} map showing search results`} /><button onClick={() => setMapSatellite((value) => !value)} className="absolute right-3 top-3 z-[1000] rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#0d3441] shadow-md">{mapSatellite ? 'Street view' : 'Satellite view'}</button></div>
}
