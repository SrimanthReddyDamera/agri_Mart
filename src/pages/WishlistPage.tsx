"use client"
import { Link } from "react-router-dom"
import { useWishlist, useCart } from "../contexts/AppContext"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product: any) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="text-6xl mb-6">❤️</div>
            <h1 className="text-3xl font-bold text-white mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-400 mb-8">Save items you love to your wishlist!</p>
            <Link to="/">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold">
                ← Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-red-400 hover:text-red-300 mb-4">
            ← Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
          <p className="text-gray-400">{wishlist.length} items saved</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-black/70 border border-red-400/30 hover:border-red-400 transition-all duration-300 rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <div className="relative mb-4">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white hover:bg-red-700"
                  >
                    🗑️
                  </button>
                </div>

                <Link to={`/product/${item.id}`}>
                  <h3 className="text-white font-semibold text-lg mb-2 hover:text-red-400 transition-colors">
                    {item.name}
                  </h3>
                </Link>

                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-red-400 font-bold text-xl">₹{item.price.toLocaleString()}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-gray-500 line-through text-sm">₹{item.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-semibold"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
