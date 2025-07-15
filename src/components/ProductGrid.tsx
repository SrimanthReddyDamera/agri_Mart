"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "./ProductCard"
import { useApp } from "../contexts/AppContext"

// Mock data
const allProducts = [
  {
    id: 1,
    name: "Premium Wheat Seeds",
    description: "High-yield wheat seeds for optimal harvest",
    price: 24899,
    originalPrice: 29099,
    image: "https://via.placeholder.com/300x300?text=Wheat+Seeds",
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
    price: 16599,
    originalPrice: 19089,
    image: "https://via.placeholder.com/300x300?text=Fertilizer",
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
    price: 7469,
    originalPrice: 9129,
    image: "https://via.placeholder.com/300x300?text=Pruning+Shears",
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
    price: 37349,
    originalPrice: 41499,
    image: "https://via.placeholder.com/300x300?text=Irrigation+Kit",
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
    price: 12449,
    originalPrice: 14939,
    image: "https://via.placeholder.com/300x300?text=Tomato+Seeds",
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
    price: 10789,
    originalPrice: 12449,
    image: "https://via.placeholder.com/300x300?text=Pesticide",
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
    price: 15769,
    originalPrice: 18259,
    image: "https://via.placeholder.com/300x300?text=Corn+Seeds",
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
    price: 6639,
    originalPrice: 7469,
    image: "https://via.placeholder.com/300x300?text=Compost",
    category: "fertilizers",
    rating: 4.2,
    reviews: 78,
    discount: 11,
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

    if (category && category !== "all") {
      filtered = filtered.filter((product) => product.category === category)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredProducts(filtered)

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
          <button
            onClick={() => handlePageChange(state.currentPage - 1)}
            disabled={state.currentPage === 1}
            className="px-4 py-2 border border-red-400 text-red-400 hover:bg-red-400 hover:text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          {Array.from({ length: state.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${
                state.currentPage === page
                  ? "bg-red-600 text-white"
                  : "border border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(state.currentPage + 1)}
            disabled={state.currentPage === state.totalPages}
            className="px-4 py-2 border border-red-400 text-red-400 hover:bg-red-400 hover:text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
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
