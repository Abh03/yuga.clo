"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

const links = [
  ["Collection", "#collection"],
  ["Story", "#story"],
  ["Lookbook", "#lookbook"],
  ["Information", "#info"],
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/15 bg-[#f1f0ec]/95 text-[#171714] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
        <a href="#top" className="text-2xl font-black tracking-[-0.07em]" aria-label="Yuga, back to top">YUGA</a>
        <nav aria-label="Main navigation" className="hidden items-center gap-9 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-xs font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-50">
              {label}
            </a>
          ))}
        </nav>
        <a href="#collection" className="hidden border border-black px-5 py-2.5 text-xs font-bold uppercase tracking-[0.17em] transition-colors hover:bg-black hover:text-white md:inline-flex">
          Explore the edit
        </a>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile navigation" className="flex flex-col border-t border-black/15 px-5 pb-6 pt-3 md:hidden">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-black/10 py-4 text-sm font-semibold uppercase tracking-[0.18em]">
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
