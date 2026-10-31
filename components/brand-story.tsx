import { ArrowUpRight } from "lucide-react"

export function BrandStory() {
  return (
    <section id="story" className="scroll-mt-20 overflow-hidden bg-[#191b1a] text-[#f3f1eb]">
      <div className="mx-auto grid max-w-[1700px] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-between px-5 py-16 md:px-10 md:py-24 lg:min-h-[800px] lg:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">01 / A little about us</p>
          <div className="max-w-2xl py-16 lg:py-0">
            <h2 className="text-[clamp(3.7rem,7.5vw,8rem)] font-semibold leading-[0.9] tracking-[-0.075em]">
              Less, but<br /><span className="italic font-normal">more you.</span>
            </h2>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-white/70">
              Yuga starts with a simple idea: a small wardrobe with room for your own story. Our first edit is a shirt in white and black, and a black hoodie.
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50">
              Wear them your way. Keep coming back to them.
            </p>
          </div>
          <a href="#collection" className="inline-flex w-fit items-center gap-2 border-b border-white/50 pb-2 text-sm font-semibold">
            Explore the first edit <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="relative min-h-[480px] overflow-hidden bg-[#464d48] lg:min-h-[800px]">
          <img
            src="/photoshoot/hoodie-street.webp"
            alt="Yuga black hoodie photographed on a city street"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute bottom-5 left-5 right-5 flex justify-between gap-4 border-t border-white/60 pt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white md:bottom-8 md:left-8 md:right-8">
            <span>Yuga / In the everyday</span>
            <span>01—02</span>
          </div>
        </div>
      </div>
    </section>
  )
}
