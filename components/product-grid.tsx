"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useApp } from "@/contexts/app-context"

// Mock data - In real app, this would come from Supabase
const allProducts = [
  {
    id: 1,
    name: "Premium Wheat Seeds",
    description: "High-yield wheat seeds for optimal harvest",
    price: 299.99 * 83,
    originalPrice: 349.99 * 83,
    image: "/placeholder.svg?height=300&width=300",
    category: "seeds",
    rating: 4.5,
    reviews: 128,
    discount: 15,
    isLimitedDeal: true,
  },
  {
    id: 2,
    name: "Organic Fertilizer NPK",
    description: "Complete nutrition for healthy crop growth",
    price: 199.99 * 83,
    originalPrice: 229.99 * 83,
    image: "/placeholder.svg?height=300&width=300",
    category: "fertilizers",
    rating: 4.8,
    reviews: 89,
    discount: 13,
    isLimitedDeal: false,
  },
  {
    id: 3,
    name: "Professional Pruning Shears",
    description: "Durable steel pruning shears for precision cutting",
    price: 89.99 * 83,
    originalPrice: 109.99 * 83,
    image: "/placeholder.svg?height=300&width=300",
    category: "tools",
    rating: 4.6,
    reviews: 234,
    discount: 18,
    isLimitedDeal: true,
  },
  {
    id: 4,
    name: "Drip Irrigation Kit",
    description: "Complete drip irrigation system for efficient watering",
    price: 449.99 * 83,
    originalPrice: 499.99 * 83,
    image: "/placeholder.svg?height=300&width=300",
    category: "irrigation",
    rating: 4.7,
    reviews: 67,
    discount: 10,
    isLimitedDeal: false,
  },
  {
    id: 5,
    name: "Tomato Hybrid Seeds",
    description: "Disease-resistant tomato seeds with high yield",
    price: 149.99 * 83,
    originalPrice: 179.99 * 83,
    image: "/placeholder.svg?height=300&width=300",
    category: "seeds",
    rating: 4.4,
    reviews: 156,
    discount: 17,
    isLimitedDeal: true,
  },
  {
    id: 6,
    name: "Bio Pesticide Spray",
    description: "Eco-friendly pesticide for organic farming",
    price: 129.99 * 83,
    originalPrice: 149.99 * 83,
    image: "/placeholder.svg?height=300&width=300",
    category: "pesticides",
    rating: 4.3,
    reviews: 92,
    discount: 13,
    isLimitedDeal: false,
  },
  {
    id: 7,
    name: "Corn Hybrid Seeds",
    description: "High-yield corn seeds with excellent disease resistance",
    price: 189.99 * 83,
    originalPrice: 219.99 * 83,
    image: "/placeholder.svg?height=300&width=300",
    category: "seeds",
    rating: 4.4,
    reviews: 156,
    discount: 14,
    isLimitedDeal: true,
  },
  {
    id: 8,
    name: "Organic Compost",
    description: "Rich organic compost for soil improvement",
    price: 79.99 * 83,
    originalPrice: 89.99 * 83,
    image: "/placeholder.svg?height=300&width=300",
    category: "fertilizers",
    rating: 4.2,
    reviews: 78,
    discount: 11,
    isLimitedDeal: false,
  },
  {
    id: 9,
    name: "Garden Hose Reel",
    description: "Automatic retractable garden hose reel",
    price: 159.99 * 83,
    originalPrice: 189.99 * 83,
    image: "/placeholder.svg?height=300&width=300",
    category: "irrigation",
    rating: 4.5,
    reviews: 45,
    discount: 16,
    isLimitedDeal: true,
  },
  {
    id: 10,
    name: "Soil pH Tester",
    description: "Digital soil pH and moisture tester",
    price: 39.99 * 83,
    originalPrice: 49.99 * 83,
    image: "/placeholder.svg?height=300&width=300",
    category: "tools",
    rating: 4.1,
    reviews: 123,
    discount: 20,
    isLimitedDeal: false,
  },
  {
    id: 11,
    name: "Rice Seeds Premium",
    description: "Premium quality rice seeds for paddy cultivation",
    price: 219.99 * 83,
    originalPrice: 249.99 * 83,
    image: "/placeholder.svg?height=300&width=300",
    category: "seeds",
    rating: 4.6,
    reviews: 89,
    discount: 12,
    isLimitedDeal: true,
  },
  {
    id: 12,
    name: "Sprinkler System",
    description: "Automated sprinkler irrigation system",
    price: 329.99 * 83,
    originalPrice: 379.99 * 83,
    image: "/placeholder.svg?height=300&width=300",
    category: "irrigation",
    rating: 4.4,
    reviews: 56,
    discount: 13,
    isLimitedDeal: false,
  },
]

const PRODUCTS_PER_PAGE = 8

interface ProductGridProps {
  category?: string
  searchQuery?: string
}

export function ProductGrid({ category, searchQuery }: ProductGridProps) {
  const { state, dispatch } = useApp()
  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  useEffect(() => {
    let filtered = allProducts

    // Filter by category
    if (category && category !== "all") {
      filtered = filtered.filter((product) => product.category === category)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredProducts(filtered)

    // Calculate pagination
    const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE)
    dispatch({
      type: "SET_PRODUCTS",
      payload: {
        products: filtered.slice(0, PRODUCTS_PER_PAGE),
        totalPages,
      },
    })
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 })
  }, [category, searchQuery, dispatch])

  useEffect(() => {
    // Update products when page changes
    const startIndex = (state.currentPage - 1) * PRODUCTS_PER_PAGE
    const endIndex = startIndex + PRODUCTS_PER_PAGE
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    dispatch({
      type: "SET_PRODUCTS",
      payload: {
        products: paginatedProducts,
        totalPages: Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
      },
    })
  }, [state.currentPage, filteredProducts, dispatch])

  const handlePageChange = (page: number) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: page })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    const startPage = Math.max(1, state.currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(state.totalPages, startPage + maxVisiblePages - 1)

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  if (state.products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white text-xl">No products found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {state.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {state.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(state.currentPage - 1)}
            disabled={state.currentPage === 1}
            className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {generatePageNumbers().map((page) => (
            <Button
              key={page}
              variant={state.currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
              className={
                state.currentPage === page
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
              }
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(state.currentPage + 1)}
            disabled={state.currentPage === state.totalPages}
            className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Results Info */}
      <div className="text-center text-gray-400">
        Showing {(state.currentPage - 1) * PRODUCTS_PER_PAGE + 1} to{" "}
        {Math.min(state.currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
      </div>
    </div>
  )
}
