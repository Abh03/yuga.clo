"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const viewportHeight = window.innerHeight

      // Calculate progress: 0 when section enters, 1 when section exits
      const progress = Math.max(0, Math.min(1, (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const horizontalScroll = scrollProgress * 500

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black py-20 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex items-center gap-12">
        {/* Sticky Left Title */}
        <div className="sticky top-1/4 flex-shrink-0 w-full md:w-96">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-4 text-balance">From Scratch</h2>
          <p className="text-lg text-white/60">Discover the story behind every Yuga piece</p>
        </div>

        {/* Horizontal Film Strip */}
        <div className="flex-1 overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: -horizontalScroll }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
          >
            {/* Image 1: Cotton Fabric */}
            <div className="flex-shrink-0 w-96 h-96">
              <img
                src="/premium-cotton-fabric-macro-shot-close-up.jpg"
                alt="Premium cotton fabric"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 2: Packaging Experience */}
            <div className="flex-shrink-0 w-96 h-96">
              <img
                src="/custom-designed-packaging-box-stickers-and-notes-y.jpg"
                alt="Yuga custom packaging and experience"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 3: Design Sketches */}
            <div className="flex-shrink-0 w-96 h-96">
              <img
                src="/artistic-fashion-design-sketches-clothing-drawings.jpg"
                alt="Design sketches and creative process"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 4: Production */}
            <div className="flex-shrink-0 w-96 h-96">
              <img
                src="/premium-clothing-production-workshop-craftsmanship.jpg"
                alt="Production and craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
