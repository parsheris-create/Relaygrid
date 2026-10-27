import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Database, HeartHandshake, LockKeyhole, MapPin, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { categories } from '@/lib/relay-grid-data'
import ncNonprofits from '@/data/nc-nonprofits.json'

export const metadata: Metadata = {
  title: 'About RelayGrid',
  description: 'Learn how RelayGrid helps people across North Carolina find trusted nonprofit and community resources.',
}

const values = [
  { icon: MapPin, title: 'Local first', description: 'Curated listings for Charlotte and communities across North Carolina sit alongside live neighborhood results from OpenStreetMap.' },
  { icon: ShieldCheck, title: 'Clear about trust', description: 'Every result shows its distance, categories, and whether it comes from the curated directory or live map data.' },
  { icon: LockKeyhole, title: 'Private by default', description: 'No account is required. Your search location is used to sort and map nearby results, not to build a profile.' },
  { icon: HeartHandshake, title: 'Built around next steps', description: 'Phone numbers, websites, hours, and eligibility notes are surfaced so people can move from searching to asking for help.' },
]

const places = ['Charlotte', 'Davidson', 'Raleigh', 'Durham', 'Greensboro', 'Winston-Salem', 'Asheville', 'Mills River', 'Wilmington', 'Fayetteville', 'Cary']

const dataNotes = [
  { icon: Database, title: 'Curated with care', description: 'North Carolina records are reviewed against official organization websites, with a source and review date attached to each listing.' },
  { icon: MapPin, title: 'Live map context', description: 'OpenStreetMap and Overpass results expand coverage in real time. These records are labeled separately and may need confirmation.' },
  { icon: Users, title: 'Made for people', description: 'The directory covers food, shelter, housing, health, safety, transportation, financial help, and more in plain language.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f6faf9] text-[#102f3b]">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-[#dfe8e6] bg-white">
          <div className="pointer-events-none absolute -right-24 -top-32 size-96 rounded-full bg-[#edf7f4]" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 size-80 rounded-full bg-[#f7fbfa]" />
          <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-9 md:py-24">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#cfe3de] bg-[#f6faf9] px-3 py-1.5 text-xs font-semibold text-[#37786e]"><Sparkles className="size-3.5" />About RelayGrid</div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-.04em] text-[#102f3b] md:text-6xl">Finding help should feel <span className="text-[#4c9d8f]">less overwhelming.</span></h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#687b81] md:text-lg">RelayGrid is a community resource finder that connects people who need support with nonprofits across North Carolina. Search by need and distance, then reach out with confidence.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#0d3441] px-5 text-sm font-semibold text-white transition hover:bg-[#194c5b]">Find support <ArrowRight className="size-4" /></Link>
              <Link href="/how-it-works" className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#bed6d1] bg-white px-5 text-sm font-semibold text-[#236f64] transition hover:bg-[#edf7f4]">See how it works</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12 md:px-9">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { value: ncNonprofits.length, label: 'North Carolina organizations curated' },
              { value: categories.length, label: 'Need categories to search' },
              { value: '0', label: 'Accounts required' },
            ].map((stat) => <div key={stat.label} className="rounded-2xl border border-[#dce8e5] bg-white p-6 shadow-[0_12px_40px_-24px_rgba(13,52,65,.35)]"><p className="text-3xl font-semibold tracking-tight text-[#0d3441]">{stat.value}</p><p className="mt-1 text-sm text-[#687b81]">{stat.label}</p></div>)}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-16 md:px-9">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[.14em] text-[#4c9d8f]">Why RelayGrid exists</p>
              <h2 className="text-3xl font-semibold tracking-[-.03em] md:text-4xl">One search. A clearer next step.</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#687b81] md:text-base">When someone needs help, the hardest part is often knowing where to begin. RelayGrid brings nearby options into one place, explains what each organization offers, and makes it easy to call, visit, or learn more.</p>
              <div className="mt-6 rounded-2xl border border-[#cfe3de] bg-[#edf7f4] p-5 text-sm leading-relaxed text-[#355963]">RelayGrid does not provide services directly. It helps people find the organizations that do, with enough context to take the next step.</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((value) => {
                const Icon = value.icon
                return <div key={value.title} className="rounded-2xl border border-[#dce8e5] bg-white p-5"><span className="grid size-10 place-items-center rounded-xl bg-[#edf7f4] text-[#277566]"><Icon className="size-5" /></span><h3 className="mt-4 font-semibold text-[#163d49]">{value.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#687b81]">{value.description}</p></div>
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-[#dfe8e6] bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-9">
            <p className="mb-2 text-xs font-bold uppercase tracking-[.14em] text-[#4c9d8f]">Where we work</p>
            <h2 className="text-3xl font-semibold tracking-[-.03em] md:text-4xl">Rooted in North Carolina</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#687b81] md:text-base">The curated directory began with Charlotte-area organizations and now reaches communities across the state. Live map results help fill in local gaps wherever you search.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {places.map((place) => <span key={place} className="rounded-full border border-[#d6e2df] bg-[#fbfdfc] px-4 py-2 text-sm font-medium text-[#527078]">{place}</span>)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 md:px-9">
          <p className="mb-2 text-xs font-bold uppercase tracking-[.14em] text-[#4c9d8f]">Data & trust</p>
          <h2 className="text-3xl font-semibold tracking-[-.03em] md:text-4xl">Helpful, honest, and easy to verify</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {dataNotes.map((note) => {
              const Icon = note.icon
              return <div key={note.title} className="rounded-2xl border border-[#dce8e5] bg-white p-6"><Icon className="size-6 text-[#4c9d8f]" /><h3 className="mt-4 font-semibold text-[#163d49]">{note.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#687b81]">{note.description}</p></div>
            })}
          </div>
          <div className="mt-10 rounded-3xl bg-[#0d3441] px-6 py-10 md:px-10 md:py-12">
            <h2 className="text-2xl font-semibold tracking-[-.02em] text-white md:text-3xl">Ready to find the right support?</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#b9d9d1] md:text-base">Search by city, ZIP code, or your current location. No account needed.</p>
            <Link href="/" className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[#a9e4d4] px-5 text-sm font-semibold text-[#0d3441] transition hover:bg-[#bce8dd]">Start a search <ArrowRight className="size-4" /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
