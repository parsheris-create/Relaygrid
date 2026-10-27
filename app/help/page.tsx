import Link from 'next/link'
import type { Metadata } from 'next'
import { AlertTriangle, ArrowRight, ChevronDown, CircleHelp, LockKeyhole, MapPinned, Phone, Search, Sparkles } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'Help & FAQ',
  description: 'Answers to common questions about using RelayGrid to find nonprofits in North Carolina.',
}

const topics = [
  { href: '#search', icon: Search, title: 'Search basics', description: 'Locations, categories, and distance.' },
  { href: '#results', icon: MapPinned, title: 'Results & map', description: 'Pins, labels, and listing details.' },
  { href: '#privacy', icon: LockKeyhole, title: 'Privacy', description: 'What happens to your search.' },
  { href: '#urgent', icon: AlertTriangle, title: 'Urgent help', description: 'Crisis and emergency contacts.' },
]

const searchFaqs = [
  { question: 'How do I search for help?', answer: 'Enter a city, ZIP code, or address on the home page, or choose "Use my current location." Then select one or more need categories and choose how far to search. Results appear on the map and in the list below it.' },
  { question: 'Do I need an account?', answer: 'No. RelayGrid does not require an account, email address, or payment information. You can search and view contact details immediately.' },
  { question: 'Why do I see organizations outside my chosen radius?', answer: 'The curated directory includes North Carolina and national organizations that serve people across the state, even when their office is farther away. Every result shows its distance from your search point. Use the category and distance controls to narrow the list.' },
  { question: 'Can RelayGrid tell me whether I qualify for help?', answer: 'No. Each organization sets its own eligibility rules and required documents. The listing includes general eligibility notes when available, but you should confirm directly with the organization.' },
]

const resultsFaqs = [
  { question: 'What does "Verified" mean?', answer: 'A verified record is part of the curated directory and was checked against the organization\'s official website. The result card shows when the record was last reviewed. Verification does not guarantee current hours, funding, or availability.' },
  { question: 'What is a demo or live map record?', answer: 'These results come from OpenStreetMap or another live source rather than the curated directory. They may be incomplete or out of date. Confirm the address, phone number, and services with the organization before visiting.' },
  { question: 'How current is the information?', answer: 'Curated records show an update date. Live map data can change at any time, and even verified listings can change their hours or programs. Calling ahead is the best way to confirm.' },
  { question: 'What do the map pin colors mean?', answer: 'Each pin is color-coded and has an icon for its primary category, such as food, shelter, health, or housing. Hover over a pin to see the organization name, category, and distance. Click a pin to open a quick contact card.' },
  { question: 'What if a listing is wrong?', answer: 'Use the official website or phone number to confirm details with the organization. RelayGrid is a directory and does not manage the organizations\' listings or schedules.' },
]

const privacyFaqs = [
  { question: 'Is my location stored?', answer: 'RelayGrid does not require an account or keep a search history. Your search text or device coordinates are sent to the app to look up the area and nearby listings, and the map uses OpenStreetMap or Esri tiles to display results.' },
  { question: 'Does RelayGrid provide services directly?', answer: 'No. RelayGrid is a community resource finder. The organizations listed provide the services and make their own decisions about eligibility and availability.' },
  { question: 'Can I use RelayGrid on my phone?', answer: 'Yes. The search, map, and organization details are designed to work on phones, tablets, and desktop computers.' },
]

function FaqList({ items, openFirst = false }: { items: { question: string; answer: string }[]; openFirst?: boolean }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <details key={item.question} open={openFirst && index === 0} className="group rounded-2xl border border-[#dce8e5] bg-white">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-semibold text-[#163d49] [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <ChevronDown className="size-4 shrink-0 text-[#4c9d8f] transition group-open:rotate-180" />
          </summary>
          <div className="border-t border-[#edf1f0] px-5 py-4 text-sm leading-relaxed text-[#687b81]">{item.answer}</div>
        </details>
      ))}
    </div>
  )
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#f6faf9] text-[#102f3b]">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-[#dfe8e6] bg-white">
          <div className="pointer-events-none absolute -right-24 -top-32 size-96 rounded-full bg-[#edf7f4]" />
          <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-9 md:py-24">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#cfe3de] bg-[#f6faf9] px-3 py-1.5 text-xs font-semibold text-[#37786e]"><CircleHelp className="size-3.5" />Help & FAQ</div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-.04em] text-[#102f3b] md:text-6xl">Questions, <span className="text-[#4c9d8f]">answered.</span></h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#687b81] md:text-lg">Find quick answers about searching, reading results, privacy, and getting urgent support.</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12 md:px-9">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic) => {
              const Icon = topic.icon
              return <a key={topic.href} href={topic.href} className="group rounded-2xl border border-[#dce8e5] bg-white p-5 transition hover:border-[#a9d4cc] hover:bg-[#fbfdfc]"><span className="grid size-10 place-items-center rounded-xl bg-[#edf7f4] text-[#277566]"><Icon className="size-5" /></span><h2 className="mt-4 font-semibold text-[#163d49]">{topic.title}</h2><p className="mt-1 text-sm text-[#687b81]">{topic.description}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#277566]">Jump to answers <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" /></span></a>
            })}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-16 md:px-9">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div className="space-y-10">
              <div id="search" className="scroll-mt-28">
                <div className="mb-4 flex items-center gap-2"><span className="grid size-9 place-items-center rounded-lg bg-[#edf7f4] text-[#277566]"><Search className="size-4" /></span><h2 className="text-2xl font-semibold text-[#163d49]">Search basics</h2></div>
                <FaqList items={searchFaqs} openFirst />
              </div>
              <div id="privacy" className="scroll-mt-28">
                <div className="mb-4 flex items-center gap-2"><span className="grid size-9 place-items-center rounded-lg bg-[#edf7f4] text-[#277566]"><LockKeyhole className="size-4" /></span><h2 className="text-2xl font-semibold text-[#163d49]">Privacy</h2></div>
                <FaqList items={privacyFaqs} />
              </div>
            </div>
            <div className="space-y-10">
              <div id="results" className="scroll-mt-28">
                <div className="mb-4 flex items-center gap-2"><span className="grid size-9 place-items-center rounded-lg bg-[#edf7f4] text-[#277566]"><MapPinned className="size-4" /></span><h2 className="text-2xl font-semibold text-[#163d49]">Results & map</h2></div>
                <FaqList items={resultsFaqs} />
              </div>
              <div id="urgent" className="scroll-mt-28 rounded-2xl border border-[#f0d6b8] bg-[#fffaf3] p-6 md:p-8">
                <div className="flex items-center gap-2"><AlertTriangle className="size-5 text-[#a46722]" /><h2 className="text-2xl font-semibold text-[#633f16]">Urgent help</h2></div>
                <p className="mt-2 text-sm leading-relaxed text-[#7a6245]">RelayGrid is not an emergency service. If you need immediate help, use these numbers.</p>
                <div className="mt-5 space-y-3">
                  <a href="tel:911" className="flex items-center justify-between rounded-xl border border-[#ecd3b4] bg-white px-4 py-3 transition hover:border-[#d5a96b]"><span><strong className="block text-sm text-[#633f16]">Immediate danger</strong><span className="text-xs text-[#8a7256]">Police, fire, or medical emergency</span></span><span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#a46722]"><Phone className="size-4" />911</span></a>
                  <a href="tel:988" className="flex items-center justify-between rounded-xl border border-[#ecd3b4] bg-white px-4 py-3 transition hover:border-[#d5a96b]"><span><strong className="block text-sm text-[#633f16]">Crisis support</strong><span className="text-xs text-[#8a7256]">Suicide &amp; Crisis Lifeline</span></span><span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#a46722]"><Phone className="size-4" />988</span></a>
                  <a href="https://nc211.org" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-[#ecd3b4] bg-white px-4 py-3 transition hover:border-[#d5a96b]"><span><strong className="block text-sm text-[#633f16]">Community resources</strong><span className="text-xs text-[#8a7256]">Food, housing, utilities, and more</span></span><span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#a46722]"><Phone className="size-4" />2-1-1</span></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-16 md:px-9">
          <div className="rounded-3xl bg-[#0d3441] px-6 py-10 md:px-10 md:py-12">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div><div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#a9e4d4]"><Sparkles className="size-3.5" />Still looking?</div><h2 className="text-2xl font-semibold tracking-[-.02em] text-white md:text-3xl">Find support near you</h2><p className="mt-2 max-w-xl text-sm leading-relaxed text-[#b9d9d1] md:text-base">Search the directory and live map by need, distance, and location.</p></div>
              <Link href="/" className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-[#a9e4d4] px-5 text-sm font-semibold text-[#0d3441] transition hover:bg-[#bce8dd]">Start a search <ArrowRight className="size-4" /></Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
