"use client"

import { useState, useRef, useEffect } from "react"

interface Feature {
  icon: string
  label: string
}

const features: Feature[] = [
  { icon: "📦", label: "Custom-Designed Box" },
  { icon: "✨", label: "Exclusive Sticker Packs" },
  { icon: "📝", label: "A Personal Note" },
  { icon: "🧵", label: "Care & Repair Kit" },
]

export function YugaExperience() {
  const [blur, setBlur] = useState(15)
  const [offsetY, setOffsetY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseEnter = () => {
      setBlur(0)
      setOffsetY(-20)
    }

    const handleMouseLeave = () => {
      setBlur(15)
      setOffsetY(0)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Parallax Background with Blur Animation */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          backgroundImage:
            "url(/placeholder.svg?height=1080&width=1920&query=custom packaging box luxury unboxing experience)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: `blur(${blur}px)`,
          transform: `translateY(${offsetY}px)`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 py-20">
        {/* Main Text */}
        <h2 className="text-6xl md:text-7xl font-black text-white text-center text-balance mb-12 md:mb-20">
          More Than Just Apparel
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="bg-white/5 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center hover:scale-105 transform transition-transform"
            >
              <div className="text-4xl md:text-5xl mb-4">{feature.icon}</div>
              <p className="text-white font-semibold text-sm md:text-base">{feature.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
