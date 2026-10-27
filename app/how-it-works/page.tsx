import Link from 'next/link'
import type { Metadata } from 'next'
import { AlertTriangle, ArrowRight, CheckCircle2, Clock, ListChecks, MapPin, Navigation, Phone, Search, ShieldCheck, SlidersHorizontal, Sparkles } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { categories } from '@/lib/relay-grid-data'
import { markerStyles } from '@/lib/map-markers'

export const metadata: Metadata = {
  title: 'How RelayGrid Works',
  description: 'See how RelayGrid helps you search for nearby nonprofits, compare results, and take the next step.',
}

const steps = [
  { number: '01', icon: Search, title: 'Tell us where to look', description: 'Enter a city, ZIP code, or address, or use your current location. RelayGrid uses that point to sort every result by distance.', detail: 'Your location is only used for this search. No account is required.' },
  { number: '02', icon: SlidersHorizontal, title: 'Choose the kind of help', description: 'Select one or more needs, from food and shelter to mental health, transportation, and financial assistance.', detail: 'The support plan shows how many listings match each need in your current search area.' },
  { number: '03', icon: Navigation, title: 'Compare and reach out', description: 'Adjust the distance, switch between map and list results, then call or visit the organization website for next steps.', detail: 'Map pins are color-coded by category and point to the listed address.' },
]

const resultLabels = [
  { icon: ShieldCheck, title: 'Verified', description: 'A curated listing reviewed against an official organization website. The review date appears on the result card.' },
  { icon: MapPin, title: 'Demo or live map record', description: 'Added from OpenStreetMap or another live source. Details may be incomplete, so confirm hours and services directly.' },
  { icon: Clock, title: 'Distance and hours', description: 'Distances are measured from your chosen search point. Hours can change, especially around holidays.' },
  { icon: Phone, title: 'Call or website', description: 'Use the call and website buttons on each card to reach the organization directly.' },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#f6faf9] text-[#102f3b]">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-[#dfe8e6] bg-white">
          <div className="pointer-events-none absolute -right-24 -top-32 size-96 rounded-full bg-[#edf7f4]" />
          <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-9 md:py-24">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#cfe3de] bg-[#f6faf9] px-3 py-1.5 text-xs font-semibold text-[#37786e]"><Sparkles className="size-3.5" />How it works</div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-.04em] text-[#102f3b] md:text-6xl">From overwhelmed to a <span className="text-[#4c9d8f]">next step.</span></h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#687b81] md:text-lg">Three simple choices help you find nearby support and understand what to do next. RelayGrid brings the options together so you can focus on reaching out.</p>
            <Link href="/" className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-[#0d3441] px-5 text-sm font-semibold text-white transition hover:bg-[#194c5b]">Start a search <ArrowRight className="size-4" /></Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 md:px-9">
          <div className="grid gap-4 lg:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <article key={step.number} className="rounded-2xl border border-[#dce8e5] bg-white p-6 shadow-[0_12px_40px_-24px_rgba(13,52,65,.35)]">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-[#edf7f4] text-[#277566]"><Icon className="size-5" /></span>
                    <span className="text-xs font-bold tracking-[.14em] text-[#9fb3ae]">{step.number}</span>
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-[#163d49]">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#687b81]">{step.description}</p>
                  <p className="mt-4 border-t border-[#edf1f0] pt-4 text-xs leading-relaxed text-[#819198]">{step.detail}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="border-y border-[#dfe8e6] bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:px-9 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[.14em] text-[#4c9d8f]">Map pins</p>
              <h2 className="text-3xl font-semibold tracking-[-.03em] md:text-4xl">Each color means something</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#687b81]">Pin colors and icons show the primary kind of help an organization offers. Hover over a pin to see its name, category, and distance, then click for contact details.</p>
              <div className="mt-6 grid grid-cols-2 gap-2.5">
                {categories.map((category) => {
                  const marker = markerStyles[category.id] ?? markerStyles.other
                  return <div key={category.id} className="flex items-center gap-2.5 rounded-lg border border-[#edf1f0] bg-[#fbfdfc] px-3 py-2"><span className="grid size-8 shrink-0 place-items-center rounded-full border-2 bg-white text-sm" style={{ borderColor: marker.color }} aria-hidden="true">{marker.emoji}</span><span className="text-xs font-medium text-[#527078]">{category.shortLabel}</span></div>
                })}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[.14em] text-[#4c9d8f]">Reading results</p>
              <h2 className="text-3xl font-semibold tracking-[-.03em] md:text-4xl">Know what the labels mean</h2>
              <div className="mt-6 space-y-3">
                {resultLabels.map((label) => {
                  const Icon = label.icon
                  return <div key={label.title} className="flex gap-3 rounded-xl border border-[#dce8e5] bg-[#fbfdfc] p-4"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#edf7f4] text-[#277566]"><Icon className="size-4" /></span><div><h3 className="text-sm font-semibold text-[#163d49]">{label.title}</h3><p className="mt-1 text-xs leading-relaxed text-[#687b81]">{label.description}</p></div></div>
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 md:px-9">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <div className="rounded-2xl border border-[#dce8e5] bg-white p-6 md:p-8">
              <span className="grid size-11 place-items-center rounded-xl bg-[#edf7f4] text-[#277566]"><ListChecks className="size-5" /></span>
              <h2 className="mt-5 text-2xl font-semibold text-[#163d49]">Before you reach out</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#687b81]">
                {["Call ahead to confirm today's hours and availability.", 'Ask what documents to bring, such as an ID or proof of address.', 'Confirm eligibility and whether there is a waitlist.', 'Ask whether an appointment is required or walk-ins are welcome.'].map((item) => <li key={item} className="flex gap-2.5"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#4c9d8f]" /><span>{item}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#f0d6b8] bg-[#fffaf3] p-6 md:p-8">
              <span className="grid size-11 place-items-center rounded-xl bg-[#fbead6] text-[#a46722]"><AlertTriangle className="size-5" /></span>
              <h2 className="mt-5 text-2xl font-semibold text-[#633f16]">If you need help right now</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-[#7a6245]">
                <p><strong className="text-[#633f16]">Immediate danger:</strong> call 911.</p>
                <p><strong className="text-[#633f16]">Crisis support:</strong> call or text 988 for the Suicide &amp; Crisis Lifeline.</p>
                <p><strong className="text-[#633f16]">Resource referrals:</strong> dial 2-1-1 or visit <a href="https://nc211.org" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">nc211.org</a>.</p>
              </div>
            </div>
          </div>
          <div className="mt-10 rounded-3xl bg-[#0d3441] px-6 py-10 md:px-10 md:py-12">
            <h2 className="text-2xl font-semibold tracking-[-.02em] text-white md:text-3xl">Find support near you</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#b9d9d1] md:text-base">Start with your location, choose the help you need, and compare options across North Carolina.</p>
            <Link href="/" className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[#a9e4d4] px-5 text-sm font-semibold text-[#0d3441] transition hover:bg-[#bce8dd]">Search nonprofits <ArrowRight className="size-4" /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
