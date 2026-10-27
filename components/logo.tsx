import Link from 'next/link'

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2.5" aria-label="RelayGrid home">
      <span className="grid size-9 place-items-center rounded-xl bg-[#0d3441] text-[#a9e4d4]"><span className="text-lg font-bold">+</span></span>
      <span className="text-lg font-semibold tracking-tight text-[#102f3b]">Relay<span className="text-[#4c9d8f]">Grid</span></span>
    </Link>
  )
}
