import HeroSection from "@/components/hero-section"
import CategorySection from "@/components/category-section"
import FeaturedProducts from "@/components/featured-products"
import DealsSection from "@/components/deals-section"
import TestimonialsSection from "@/components/testimonials-section"
import NewsletterSection from "@/components/newsletter-section"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <DealsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  )
}
