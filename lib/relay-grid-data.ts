export type Category = {
  id: string
  label: string
  shortLabel: string
  icon: string
}

export type Organization = {
  id: string
  name: string
  description: string
  categories: string[]
  tags?: string[]
  latitude: number
  longitude: number
  address: string
  phone: string
  website: string
  hours: string
  eligibility: string
  verified: boolean
  source: string
  updated: string
}

export const categories: Category[] = [
  { id: 'shelter', label: 'Emergency shelter', shortLabel: 'Shelter', icon: '⌂' },
  { id: 'food', label: 'Food assistance & food banks', shortLabel: 'Food', icon: '✦' },
  { id: 'supplies', label: 'Clothing & essential supplies', shortLabel: 'Supplies', icon: '□' },
  { id: 'disaster', label: 'Disaster relief', shortLabel: 'Disaster relief', icon: '⌁' },
  { id: 'housing', label: 'Housing assistance', shortLabel: 'Housing', icon: '▱' },
  { id: 'transportation', label: 'Transportation assistance', shortLabel: 'Transportation', icon: '→' },
  { id: 'health', label: 'Medical & community health', shortLabel: 'Health', icon: '+' },
  { id: 'mental-health', label: 'Mental health support', shortLabel: 'Mental health', icon: '◌' },
  { id: 'domestic-violence', label: 'Domestic violence support', shortLabel: 'Safety', icon: '◇' },
  { id: 'youth', label: 'Youth & family services', shortLabel: 'Youth & family', icon: '♧' },
  { id: 'financial', label: 'Financial assistance', shortLabel: 'Financial', icon: '$' },
  { id: 'disability', label: 'Disability & accessibility', shortLabel: 'Accessibility', icon: '◎' },
  { id: 'other', label: 'Other community resources', shortLabel: 'Other', icon: '•••' },
]

export const organizations: Organization[] = [
  { id: 'harbor-house', name: 'Harbor House Community Center', description: 'A welcoming neighborhood hub offering meals, short-term shelter referrals, and case management.', categories: ['shelter', 'food', 'housing', 'youth'], latitude: 40.727, longitude: -73.992, address: '245 Mercer Street, New York, NY', phone: '(212) 555-0184', website: 'harborhouse.example.org', hours: 'Open today · 7:00 AM–9:00 PM', eligibility: 'Walk-ins welcome. Intake required for overnight shelter referrals.', verified: true, source: 'Community partner report', updated: 'Updated 2 days ago' },
  { id: 'north-star', name: 'North Star Food Cooperative', description: 'Weekly groceries, hot meals, and benefits navigation for neighbors facing food insecurity.', categories: ['food', 'supplies', 'financial'], latitude: 40.741, longitude: -73.979, address: '82 East 27th Street, New York, NY', phone: '(212) 555-0132', website: 'northstar.example.org', hours: 'Food pantry · Tue & Thu, 10:00 AM–4:00 PM', eligibility: 'Bring photo ID if available; no proof of income required.', verified: true, source: 'Community partner report', updated: 'Updated 5 days ago' },
  { id: 'bridgeway', name: 'Bridgeway Family Services', description: 'Family advocates connect parents and young people to housing, health, and transportation support.', categories: ['housing', 'transportation', 'health', 'youth'], latitude: 40.714, longitude: -74.006, address: '11 Barclay Street, New York, NY', phone: '(212) 555-0167', website: 'bridgeway.example.org', hours: 'Mon–Fri · 9:00 AM–5:00 PM', eligibility: 'Serving families and young adults in Lower Manhattan.', verified: true, source: 'City resource registry', updated: 'Updated 1 week ago' },
  { id: 'safe-horizon', name: 'Safe Horizon Resource Desk', description: 'Confidential support, safety planning, and connections to legal and emergency services.', categories: ['domestic-violence', 'mental-health', 'shelter'], latitude: 40.752, longitude: -73.988, address: '120 West 42nd Street, New York, NY', phone: '(212) 555-0199', website: 'safehorizon.example.org', hours: '24/7 crisis line · Office hours vary', eligibility: 'Confidential support available regardless of documentation.', verified: false, source: 'Demo dataset', updated: 'Sample record — verify before visiting' },
  { id: 'community-clinic', name: 'Eastside Community Clinic', description: 'Low-cost primary care, mental health referrals, and prescription assistance for local residents.', categories: ['health', 'mental-health', 'disability'], latitude: 40.766, longitude: -73.957, address: '410 East 59th Street, New York, NY', phone: '(212) 555-0148', website: 'eastsideclinic.example.org', hours: 'Mon–Sat · 8:30 AM–6:00 PM', eligibility: 'Sliding-scale appointments available; call ahead for availability.', verified: true, source: 'Community partner report', updated: 'Updated 3 days ago' },
  { id: 'relief-network', name: 'Metro Relief Network', description: 'Disaster response supplies, emergency transportation, and volunteer-led recovery support.', categories: ['disaster', 'supplies', 'transportation'], latitude: 40.703, longitude: -74.017, address: '6 South Street, New York, NY', phone: '(212) 555-0120', website: 'metrorelief.example.org', hours: 'Response center · 8:00 AM–8:00 PM', eligibility: 'Services vary by active response and available supplies.', verified: false, source: 'Demo dataset', updated: 'Sample record — verify before visiting' },
]
