import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { Logo } from '@/components/logo'

const exploreLinks = [
  { href: '/', label: 'Find help' },
  { href: '/how-it-works', label: 'How it works' },
]

const aboutLinks = [
  { href: '/about', label: 'About RelayGrid' },
  { href: '/help', label: 'Help & FAQ' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-[#dfe8e6] bg-white">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:px-9">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#687b81]">A clearer path to local support across North Carolina. Search by need and distance, then connect directly with the organizations that can help.</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f2f8f6] px-3 py-1.5 text-xs font-semibold text-[#527078]"><MapPin className="size-3.5 text-[#4c9d8f]" />Charlotte and communities across NC</p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[.14em] text-[#4c9d8f]">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#53676e]">
            {exploreLinks.map((link) => <li key={link.href}><Link href={link.href} className="transition hover:text-[#0d3441]">{link.label}</Link></li>)}
            <li><a href="https://nc211.org" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 transition hover:text-[#0d3441]">NC 211 resource line <ArrowUpRight className="size-3.5" /></a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[.14em] text-[#4c9d8f]">About</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#53676e]">
            {aboutLinks.map((link) => <li key={link.href}><Link href={link.href} className="transition hover:text-[#0d3441]">{link.label}</Link></li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-[#edf1f0]">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-2 px-5 py-5 text-xs leading-relaxed text-[#809399] md:flex-row md:items-center md:justify-between md:px-9">
          <p>RelayGrid is a community resource finder prototype. Always call ahead to confirm hours, eligibility, and availability.</p>
          <p className="shrink-0">If you are in immediate danger, call 911. For crisis support, call or text 988.</p>
        </div>
      </div>
    </footer>
  )
}
