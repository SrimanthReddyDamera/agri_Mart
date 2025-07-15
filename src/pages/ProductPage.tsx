"use client"
import { useParams, Link } from "react-router-dom"

export default function ProductPage() {
  const { id } = useParams()

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-red-400 hover:text-red-300 mb-4">
          ← Back to Products
        </Link>

        <div className="text-center py-20">
          <h1 className="text-3xl font-bold text-white mb-4">Product Details</h1>
          <p className="text-gray-400">Product ID: {id}</p>
          <p className="text-gray-400 mt-4">Product details page coming soon...</p>
        </div>
      </div>
    </div>
  )
}
