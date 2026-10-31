const shots = [
  {
    src: "/photoshoot/hoodie-duo.webp",
    alt: "Two models wearing Yuga black hoodies",
    label: "Together / Hoodie",
    className: "md:col-span-7",
  },
  {
    src: "/photoshoot/shirt-black-flowers.webp",
    alt: "Yuga black shirt styled with sunflowers",
    label: "Out there / Shirt",
    className: "md:col-span-5",
  },
  {
    src: "/photoshoot/hoodie-back-women.webp",
    alt: "Back graphic of the Yuga black hoodie",
    label: "The back / Hoodie",
    className: "md:col-span-5",
  },
  {
    src: "/photoshoot/shirt-black-front.webp",
    alt: "Yuga black shirt worn outdoors",
    label: "Everyday / Shirt",
    className: "md:col-span-7",
  },
]

export function YugaExperience() {
  return (
    <section id="lookbook" className="scroll-mt-20 bg-[#e6e5df] px-5 py-20 text-[#171714] md:px-10 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 flex flex-col justify-between gap-7 border-b border-black/20 pb-8 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em]">Yuga / Seen outside</p>
            <h2 className="text-[clamp(3.6rem,8vw,8.5rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
              Worn your way.
            </h2>
          </div>
          <p className="max-w-xs text-base leading-relaxed text-black/60">
            A closer look at the two pieces that started it all.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-12 md:gap-6">
          {shots.map((shot) => (
            <figure key={shot.src} className={shot.className}>
              <div className="aspect-[4/4.7] overflow-hidden bg-[#cccac3] md:aspect-[4/4]">
                <img src={shot.src} alt={shot.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025]" />
              </div>
              <figcaption className="flex justify-between border-t border-black/20 pt-3 text-[11px] font-semibold uppercase tracking-[0.2em]">
                <span>{shot.label}</span>
                <span>Yuga</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
