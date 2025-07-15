"use client"
import { useSearchParams } from "react-router-dom"
import { ProductGrid } from "../components/ProductGrid"
import { HeroSection } from "../components/HeroSection"
import { CategoryFilter } from "../components/CategoryFilter"
import { SearchBar } from "../components/SearchBar"

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category") || undefined
  const search = searchParams.get("search") || undefined

  return (
    <div className="min-h-screen">
      <HeroSection />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="mb-8">
          <CategoryFilter selectedCategory={category} />
        </div>

        <ProductGrid category={category} searchQuery={search} />
      </div>
    </div>
  )
}
