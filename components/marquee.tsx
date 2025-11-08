"use client"

interface MarqueeProps {
  text: string
}

export function Marquee({ text }: MarqueeProps) {
  return (
    <div className="relative w-screen overflow-hidden bg-black py-8 md:py-12">
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-content {
          animation: marquee 20s linear infinite;
          display: flex;
          white-space: nowrap;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="marquee-content">
        <span
          className="text-6xl md:text-8xl font-black text-white/30 px-8 hover:text-white/60 transition-colors"
          style={{ WebkitTextStroke: "2px white" }}
        >
          {text}
        </span>
        <span
          className="text-6xl md:text-8xl font-black text-white/30 px-8 hover:text-white/60 transition-colors"
          style={{ WebkitTextStroke: "2px white" }}
        >
          {text}
        </span>
      </div>
    </div>
  )
}
