"use client"

import { Hero } from "@/components/hero"
import { SiteHeader } from "@/components/site-header"
import { BrandStory } from "@/components/brand-story"
import { ProductShowcase } from "@/components/product-showcase"
import { YugaExperience } from "@/components/yuga-experience"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main id="top" className="overflow-clip">
      <Hero />
      <SiteHeader />
      <ProductShowcase />
      <BrandStory />
      <YugaExperience />
      <CallToAction />
      <Footer />
    </main>
  )
}
