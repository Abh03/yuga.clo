"use client"

import { useRef, useEffect, useState } from "react"
// NEW: Import the Transition type
import { motion, AnimatePresence, Transition } from "framer-motion"

// --- TUNING PARAMETERS ---
const TRAIL_INTERVAL = 10 
const TRAIL_LIFESPAN = 1500 
const TAIL_DOT_SIZE = 120 
const DRIFT_MULTIPLIER = 4 
// --- END OF TUNING ---

// Dot type
type Dot = {
  id: number;
  x: number;
  y: number;
  velocityX: number; 
  velocityY: number; 
};

// NEW: Explicitly type transitions using the imported 'Transition'
const driftTransition: Transition = { 
  type: "spring", 
  damping: 200, 
  stiffness: 100, 
  mass: 1 
}
const exitTransition: Transition = { 
  duration: 0.8, 
  ease: "easeOut" 
}


export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [dots, setDots] = useState<Dot[]>([])
  const lastDotTimeRef = useRef(0)
  const lastMousePosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const lastPos = lastMousePosRef.current
      const velocityX = x - lastPos.x
      const velocityY = y - lastPos.y

      lastMousePosRef.current = { x, y }

      const now = Date.now()
      if (now - lastDotTimeRef.current > TRAIL_INTERVAL) {
        lastDotTimeRef.current = now
        
        const newDot = { id: now, x, y, velocityX, velocityY }
        
        setDots((prevDots) => [...prevDots, newDot])
        
        setTimeout(() => {
          setDots((prevDots) => prevDots.filter((dot) => dot.id !== newDot.id))
        }, TRAIL_LIFESPAN)
      }
    }

    const handleMouseLeave = () => {
      lastMousePosRef.current = { x: 0, y: 0 }
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener("mousemove", handleMouseMove)
      section.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove)
        section.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Base Image (Shirt) */}
      <div className="absolute inset-0">
        <img
          src="/shirt.png"
          alt="Yuga loose-fit cotton shirt"
          className="h-full w-full object-cover"
        />
      </div>
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* --- SVG MASK (WITH NEW FILTER) --- */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="liquid-paint-filter">
            {/* 1. Melt the dots together */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            {/* 2. Re-sharpen the merged shape */}
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 1 1 40 -10"
              result="gooey"
            />
            {/* 3. Create the water texture */}
            <feTurbulence
              baseFrequency="0.02 0.05"
              numOctaves="1"
              result="noise"
            />
            {/* 4. Displace the "gooey" shape with the "noise" */}
            <feDisplacementMap
              in="gooey"
              in2="noise"
              scale="50"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <mask id="liquid-mask">
            <AnimatePresence>
              {dots.map((dot) => (
                <motion.circle
                  key={dot.id}
                  cx={dot.x}
                  cy={dot.y}
                  r={TAIL_DOT_SIZE}
                  fill="white"
                  filter="url(#liquid-paint-filter)" 
                  
                  animate={{
                    cx: dot.x + dot.velocityX * DRIFT_MULTIPLIER,
                    cy: dot.y + dot.velocityY * DRIFT_MULTIPLIER,
                  }}
                  // Use the typed transition
                  transition={driftTransition}
                  
                  exit={{
                    r: 0,
                    opacity: 0,
                    // Use the typed transition
                    transition: exitTransition,
                  }}
                />
              ))}
            </AnimatePresence>
          </mask>
        </defs>
      </svg>
      {/* --- END OF SVG --- */}


      {/* Hoodie div */}
      <div
        className="absolute inset-0"
        style={{
          mask: "url(#liquid-mask)",
          WebkitMask: "url(#liquid-mask)",
        }}
      >
        <img
          src="/hoodie.png"
          alt="Yuga hoodie"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col px-6 pt-10 z-10">
        <h1 className="text-7xl font-bold text-white text-balance drop-shadow-lg">
          Yuga
        </h1>
        <p className="mt-6 text-xl text-white/90 text-balance drop-shadow-md">
          Rethink Your Wardrobe
        </p>
      </div>
    </section>
  )
}