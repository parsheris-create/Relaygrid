'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

const navigation = [
  { href: '/', label: 'Find help' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/about', label: 'About RelayGrid' },
  { href: '/help', label: 'Help' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))
  return (
    <header className="sticky top-0 z-[1200] border-b border-[#dfe8e6] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-4 md:px-9">
        <Logo onClick={() => setOpen(false)} />
        <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full bg-[#f2f8f6] p-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn('rounded-full px-4 py-2 text-sm font-medium transition', isActive(item.href) ? 'bg-white text-[#0d3441] shadow-sm' : 'text-[#53676e] hover:text-[#0d3441]')}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full bg-[#edf7f4] px-3 py-1.5 text-xs font-semibold text-[#277566] sm:inline-flex">NC + LIVE DATA</span>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-[#d6e2df] text-[#355963] transition hover:border-[#a9d4cc] hover:bg-[#f0f7f5] md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-[#dfe8e6] bg-white px-5 py-3 md:hidden">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn('block rounded-lg px-3 py-3 text-sm font-medium', isActive(item.href) ? 'bg-[#edf7f4] text-[#0d3441]' : 'text-[#53676e] hover:bg-[#f7fbfa] hover:text-[#0d3441]')}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
