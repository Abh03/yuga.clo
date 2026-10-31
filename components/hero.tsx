"use client"

import { useEffect, useRef } from "react"

type Reveal = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  age: number
  life: number
  strength: number
}

const IDLE_DELAY = 2400
const IDLE_PAUSE = 4200

function drawCover(ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
  const imageWidth = image.naturalWidth * scale
  const imageHeight = image.naturalHeight * scale
  ctx.drawImage(image, (width - imageWidth) / 2, (height - imageHeight) / 2, imageWidth, imageHeight)
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!section || !canvas || !ctx) return

    const mask = document.createElement("canvas")
    const maskCtx = mask.getContext("2d")
    if (!maskCtx) return

    const hoodie = new Image()
    let imageReady = false
    let width = 0
    let height = 0
    let frame = 0
    let previousTime = 0
    let lastRevealTime = 0
    let lastPointerTime = 0
    let nextIdleTime = performance.now() + IDLE_DELAY
    let idleStart = 0
    let idleX = 0
    let idleY = 0
    let idleDirection = 1
    let pointerActive = false
    let cursorInitialized = false
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let motionReduced = motionQuery.matches
    const cursor = { x: 0, y: 0, vx: 0, vy: 0, targetX: 0, targetY: 0 }
    const reveals: Reveal[] = []

    const resize = () => {
      const rect = section.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = mask.width = Math.round(width * dpr)
      canvas.height = mask.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const addReveal = (x: number, y: number, vx: number, vy: number, idle = false) => {
      const radius = idle ? 47 : Math.min(105 + Math.hypot(vx, vy) * 1.3, 142)
      reveals.push({
        x, y,
        vx: vx * 0.55 + (Math.random() - 0.5) * 1.5,
        vy: vy * 0.55 + (Math.random() - 0.5) * 1.5,
        radius, age: 0, life: idle ? 1050 : 1550, strength: idle ? 0.68 : 0.9,
      })

      // Small droplets break up the edge of the larger reveal.
      if (Math.random() < (idle ? 0.28 : 0.58)) {
        reveals.push({
          x: x + (Math.random() - 0.5) * radius * 0.95,
          y: y + (Math.random() - 0.5) * radius * 0.95,
          vx: vx * 0.8 + (Math.random() - 0.5) * 2.5,
          vy: vy * 0.8 + (Math.random() - 0.5) * 2.5,
          radius: radius * (0.25 + Math.random() * 0.25),
          age: 0, life: idle ? 700 : 1050, strength: 0.58,
        })
      }
      if (reveals.length > 150) reveals.splice(0, reveals.length - 150)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return
      const rect = section.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      if (!cursorInitialized) {
        cursor.x = x
        cursor.y = y
        cursorInitialized = true
      }
      cursor.targetX = x
      cursor.targetY = y
      pointerActive = true
      lastPointerTime = performance.now()
      nextIdleTime = lastPointerTime + IDLE_DELAY
      idleStart = 0
    }

    const onPointerLeave = () => {
      pointerActive = false
      nextIdleTime = performance.now() + IDLE_DELAY
    }

    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      motionReduced = event.matches
      if (motionReduced) reveals.length = 0
      else nextIdleTime = performance.now() + IDLE_DELAY
    }

    const render = (now: number) => {
      const dt = Math.min(now - (previousTime || now), 32)
      const step = dt / 16.67
      previousTime = now

      if (!motionReduced && width && height && imageReady) {
        // The damped spring travels briefly after the physical cursor stops.
        if (pointerActive) {
          cursor.vx = (cursor.vx + (cursor.targetX - cursor.x) * 0.105 * step) * Math.pow(0.77, step)
          cursor.vy = (cursor.vy + (cursor.targetY - cursor.y) * 0.105 * step) * Math.pow(0.77, step)
          cursor.x += cursor.vx * step
          cursor.y += cursor.vy * step
          const speed = Math.hypot(cursor.vx, cursor.vy)
          if (now - lastRevealTime >= 22 && (speed > 0.2 || now - lastPointerTime < 160)) {
            addReveal(cursor.x, cursor.y, cursor.vx, cursor.vy)
            lastRevealTime = now
          }
        }

        // A brief curved sweep supplies the occasional reveal during inactivity.
        if (now >= nextIdleTime && !idleStart) {
          idleStart = now
          idleX = width * (0.2 + Math.random() * 0.6)
          idleY = height * (0.24 + Math.random() * 0.52)
          idleDirection = Math.random() < 0.5 ? -1 : 1
        }
        if (idleStart) {
          const progress = (now - idleStart) / 760
          if (progress < 1) {
            if (now - lastRevealTime >= 34) {
              const distance = 115 * Math.sin(progress * Math.PI)
              addReveal(
                idleX + idleDirection * distance,
                idleY + Math.sin(progress * Math.PI * 1.5) * 34,
                idleDirection * 2.4 * Math.cos(progress * Math.PI),
                1.2 * Math.cos(progress * Math.PI * 1.5),
                true,
              )
              lastRevealTime = now
            }
          } else {
            idleStart = 0
            nextIdleTime = now + IDLE_PAUSE
          }
        }

        maskCtx.clearRect(0, 0, width, height)
        for (let i = reveals.length - 1; i >= 0; i--) {
          const reveal = reveals[i]
          reveal.age += dt
          if (reveal.age >= reveal.life) {
            reveals.splice(i, 1)
            continue
          }
          reveal.x += reveal.vx * step
          reveal.y += reveal.vy * step
          reveal.vx *= Math.pow(0.976, step)
          reveal.vy *= Math.pow(0.976, step)

          const remaining = 1 - reveal.age / reveal.life
          const fade = Math.min(1, reveal.age / 130) * remaining * remaining
          const radius = reveal.radius * (0.8 + 0.3 * remaining)
          const stretch = 1 + Math.min(Math.hypot(reveal.vx, reveal.vy) * 0.035, 0.65)
          maskCtx.save()
          maskCtx.translate(reveal.x, reveal.y)
          maskCtx.rotate(Math.atan2(reveal.vy, reveal.vx))
          maskCtx.scale(stretch, 1 / Math.sqrt(stretch))
          const gradient = maskCtx.createRadialGradient(0, 0, 0, 0, 0, radius)
          gradient.addColorStop(0, `rgba(255,255,255,${fade * reveal.strength})`)
          gradient.addColorStop(0.42, `rgba(255,255,255,${fade * reveal.strength * 0.94})`)
          gradient.addColorStop(0.78, `rgba(255,255,255,${fade * reveal.strength * 0.38})`)
          gradient.addColorStop(1, "rgba(255,255,255,0)")
          maskCtx.fillStyle = gradient
          maskCtx.beginPath()
          maskCtx.arc(0, 0, radius, 0, Math.PI * 2)
          maskCtx.fill()
          maskCtx.restore()
        }

        ctx.clearRect(0, 0, width, height)
        if (reveals.length) {
          drawCover(ctx, hoodie, width, height)
          ctx.globalCompositeOperation = "destination-in"
          ctx.drawImage(mask, 0, 0, width, height)
          ctx.globalCompositeOperation = "source-over"
        }
      } else {
        ctx.clearRect(0, 0, width, height)
      }
      frame = requestAnimationFrame(render)
    }

    hoodie.onload = () => { imageReady = true }
    hoodie.src = "/hoodie.png"
    const observer = new ResizeObserver(resize)
    observer.observe(section)
    resize()
    section.addEventListener("pointermove", onPointerMove)
    section.addEventListener("pointerleave", onPointerLeave)
    motionQuery.addEventListener("change", onReducedMotionChange)
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      section.removeEventListener("pointermove", onPointerMove)
      section.removeEventListener("pointerleave", onPointerLeave)
      motionQuery.removeEventListener("change", onReducedMotionChange)
      hoodie.onload = null
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-background">
      <img src="/shirt.png" alt="Yuga loose-fit cotton shirt" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/20" />
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col px-6 pt-10">
        <h1 className="text-7xl font-bold text-white text-balance drop-shadow-lg">Yuga</h1>
        <p className="mt-6 text-xl text-white/90 text-balance drop-shadow-md">Rethink Your Wardrobe</p>
      </div>
    </section>
  )
}
