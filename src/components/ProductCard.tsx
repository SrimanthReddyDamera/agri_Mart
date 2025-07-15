"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart, useWishlist } from "../contexts/AppContext"

interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
  category: string
  rating: number
  reviews: number
  discount: number
  isLimitedDeal: boolean
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    addToCart(product)
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 500)
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className="bg-black/70 border border-red-400/30 hover:border-red-400 transition-all duration-300 hover:shadow-lg hover:shadow-red-400/20 rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="relative mb-4">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </Link>
          {product.discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              -{product.discount}%
            </span>
          )}
          {product.isLimitedDeal && (
            <span className="absolute top-2 right-2 bg-orange-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              ⏰ Limited
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute bottom-2 right-2 p-2 rounded-full ${
              isInWishlist(product.id)
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-black/50 text-white hover:bg-red-600"
            }`}
          >
            {isInWishlist(product.id) ? "❤️" : "🤍"}
          </button>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="text-white font-semibold text-lg mb-2 hover:text-red-400 transition-colors">{product.name}</h3>
        </Link>

        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <span className="text-yellow-400">⭐</span>
            <span className="text-white text-sm ml-1">{product.rating}</span>
          </div>
          <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-red-400 font-bold text-xl">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-gray-500 line-through text-sm">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>

      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-semibold transition-colors disabled:opacity-50"
        >
          🛒 {isAddingToCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}
