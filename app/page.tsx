"use client"

import { Hero } from "@/components/hero"
import { BrandStory } from "@/components/brand-story"
import { ProductShowcase } from "@/components/product-showcase"
import { YugaExperience } from "@/components/yuga-experience"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <BrandStory />
      <ProductShowcase />
      <YugaExperience />
      <CallToAction />
      <Footer />
    </main>
  )
}
