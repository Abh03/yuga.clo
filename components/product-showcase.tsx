"use client"

import { useState } from "react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

type ShirtColor = "Black" | "White"

export function ProductShowcase() {
  const [shirtColor, setShirtColor] = useState<ShirtColor>("Black")

  return (
    <section id="collection" className="scroll-mt-20 bg-[#f1f0ec] px-5 py-20 text-[#171714] md:px-10 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 flex flex-col justify-between gap-8 border-b border-black/20 pb-9 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em]">Yuga / The first edit</p>
            <h2 className="max-w-3xl text-[clamp(3.25rem,8vw,8.5rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
              Just the essentials.
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-base leading-relaxed text-black/65">
              One shirt, two colorways. One hoodie in black. A focused first collection made to become part of your everyday.
            </p>
            <a href="#lookbook" className="mt-6 inline-flex items-center gap-2 border-b border-black pb-1 text-sm font-semibold">
              View the lookbook <ArrowDownRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-6">
          <article className="group">
            <div className="relative aspect-[4/4.7] overflow-hidden bg-[#d7d6d0]">
              {shirtColor === "Black" ? (
                <img
                  src="/photoshoot/shirt-black-editorial.webp"
                  alt="Yuga black shirt worn outdoors"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center bg-[#e8e7e2] p-8 text-center">
                  <span className="mb-8 h-28 w-28 rounded-full border border-black/15 bg-[#faf9f6] shadow-[0_10px_40px_rgba(0,0,0,0.06)]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.34em] text-black/55">White colorway</span>
                  <span className="mt-4 max-w-48 text-sm leading-relaxed text-black/55">Photoshoot image coming soon</span>
                </div>
              )}
              <span className="absolute left-4 top-4 bg-[#f1f0ec] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] md:left-6 md:top-6">
                01 / The shirt
              </span>
            </div>
            <div className="flex flex-wrap items-start justify-between gap-6 border-b border-black/20 py-6">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-black/50">Two colorways</p>
                <h3 className="text-3xl font-semibold tracking-[-0.05em] md:text-4xl">The Yuga Shirt</h3>
              </div>
              <p className="pt-1 text-sm text-black/55">Price to be announced</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-5 py-5">
              <div className="flex items-center gap-3" aria-label="Shirt color">
                <span className="mr-2 text-xs font-semibold uppercase tracking-[0.18em]">Color</span>
                {(["Black", "White"] as const).map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setShirtColor(color)}
                    aria-pressed={shirtColor === color}
                    className={`flex items-center gap-2 border-b pb-1 text-sm transition-colors ${shirtColor === color ? "border-black text-black" : "border-transparent text-black/45 hover:text-black"}`}
                  >
                    <span className={`h-3.5 w-3.5 rounded-full border ${color === "Black" ? "border-black bg-black" : "border-black/30 bg-white"}`} />
                    {color}
                  </button>
                ))}
              </div>
              <a href="#lookbook" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline">
                See it worn <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </article>

          <article className="group">
            <div className="relative aspect-[4/4.7] overflow-hidden bg-[#282c30]">
              <img
                src="/photoshoot/hoodie-front-men.webp"
                alt="Yuga black hoodie worn with light trousers"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
              />
              <span className="absolute left-4 top-4 bg-[#f1f0ec] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] md:left-6 md:top-6">
                02 / The hoodie
              </span>
            </div>
            <div className="flex flex-wrap items-start justify-between gap-6 border-b border-black/20 py-6">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-black/50">Black</p>
                <h3 className="text-3xl font-semibold tracking-[-0.05em] md:text-4xl">The Yuga Hoodie</h3>
              </div>
              <p className="pt-1 text-sm text-black/55">Price to be announced</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-5 py-5">
              <p className="text-sm text-black/60">Available in black</p>
              <a href="#lookbook" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline">
                See it worn <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
        <p className="mt-10 border-t border-black/15 pt-5 text-xs leading-relaxed text-black/50">
          Size details, prices, and ordering information will be added when confirmed.
        </p>
      </div>
    </section>
  )
}
