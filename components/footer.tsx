export function Footer() {
  return (
    <footer className="bg-[#171917] px-5 pb-8 pt-16 text-[#f3f1eb] md:px-10 md:pt-20">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 border-b border-white/20 pb-16 md:grid-cols-[1fr_auto_auto] md:gap-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Yuga / The first edit</p>
            <p className="mt-5 max-w-xs text-lg leading-relaxed text-white/70">A small collection for the everyday. One shirt. One hoodie. Your story.</p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-4 text-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">Explore</p>
            <a href="#collection" className="hover:text-white/60">The collection</a>
            <a href="#story" className="hover:text-white/60">Our story</a>
            <a href="#lookbook" className="hover:text-white/60">Lookbook</a>
          </nav>
          <div className="flex flex-col gap-4 text-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">Information</p>
            <a href="#info" className="hover:text-white/60">Pricing & sizes</a>
            <a href="#info" className="hover:text-white/60">Ordering</a>
            <a href="#info" className="hover:text-white/60">Contact</a>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-7 text-xs uppercase tracking-[0.16em] text-white/45 md:flex-row">
          <span>© {new Date().getFullYear()} Yuga</span>
          <span>Made for the everyday</span>
        </div>
        <p aria-hidden="true" className="mt-7 overflow-hidden text-[clamp(7rem,23vw,26rem)] font-semibold leading-[0.75] tracking-[-0.11em]">
          YUGA
        </p>
      </div>
    </footer>
  )
}
