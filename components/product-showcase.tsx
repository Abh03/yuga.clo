"use client"

import { useState } from "react"
import { Marquee } from "./marquee"

interface ProductCardProps {
  title: string
  subtitle: string
  image: string
  alt: string
}

function ProductCard({ title, subtitle, image, alt }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Hover Zoom */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: isHovered ? "scale(1.1)" : "scale(1)",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
        <h3 className="text-5xl md:text-7xl font-black text-white text-center text-balance mb-4">{title}</h3>
        <p className="text-xl md:text-2xl text-white/80 text-center mb-12">{subtitle}</p>
        <button
          className={`px-12 py-4 font-semibold text-lg transition-all duration-500 ${
            isHovered
              ? "bg-white text-black hover:bg-white/90"
              : "bg-white/20 text-white hover:bg-white/30 border border-white/50"
          }`}
        >
          Shop Now
        </button>
      </div>
    </div>
  )
}

export function ProductShowcase() {
  return (
    <>
      {/* Shirts Section */}
      <Marquee text="LOOSE-FIT SHIRTS" />
      <ProductCard
        title="The Classic Tee"
        subtitle="Premium, soft-touch cotton"
        image="/shirt.png"
        alt="Yuga loose-fit cotton shirt"
      />

      {/* Hoodies Section */}
      <Marquee text="WINTER HOODIES" />
      <ProductCard
        title="The Yuga Hoodie"
        subtitle="Built for Comfort"
        image="/hoodie.png"
        alt="Yuga winter hoodie"
      />
    </>
  )
}
