import { ArrowUpRight } from "lucide-react"

export function CallToAction() {
  return (
    <section id="info" className="scroll-mt-20 bg-[#dcdad2] px-5 py-20 text-[#171714] md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em]">The next step</p>
          <h2 className="max-w-3xl text-[clamp(3.7rem,8vw,8.8rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
            Good things take shape.
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-black/65">
            The collection is here to explore. We&apos;ll share the remaining details as soon as they&apos;re ready.
          </p>
          <a href="#collection" className="mt-9 inline-flex items-center gap-2 border-b border-black pb-2 text-sm font-semibold">
            Back to the pieces <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="self-end border-t border-black/25">
          {[
            ["Pricing", "To be announced"],
            ["Sizes & fit", "Guide coming soon"],
            ["Ordering", "Details coming soon"],
            ["Contact", "Details coming soon"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-5 border-b border-black/25 py-5">
              <span className="text-sm font-semibold uppercase tracking-[0.16em]">{label}</span>
              <span className="text-right text-sm text-black/55">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
