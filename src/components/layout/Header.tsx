"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart, useWishlist, useApp } from "../../contexts/AppContext"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { cartItemsCount } = useCart()
  const { wishlist } = useWishlist()
  const { state } = useApp()
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-red-400/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <span className="text-red-400">🚜</span>
            AgriMart
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white hover:text-red-400 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-red-400 transition-colors">
              About
            </Link>
            <Link to="/support" className="text-white hover:text-red-400 transition-colors">
              Support
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 bg-black/50 border border-red-400/50 rounded text-white placeholder:text-gray-400 focus:outline-none focus:border-red-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
            >
              🔍
            </button>
          </form>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative text-white hover:text-red-400 p-2">
              🛒
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="hidden md:flex relative text-white hover:text-red-400 p-2">
              ❤️
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button className="text-white hover:text-red-400 p-2">👤</button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 border border-red-400/30 rounded-lg shadow-lg hidden group-hover:block">
                {state.user ? (
                  <>
                    <Link to="/orders" className="block px-4 py-2 text-white hover:text-red-400 hover:bg-red-400/10">
                      📦 My Orders
                    </Link>
                    <Link to="/profile" className="block px-4 py-2 text-white hover:text-red-400 hover:bg-red-400/10">
                      👤 Profile
                    </Link>
                    {state.user.role === "admin" && (
                      <Link to="/admin" className="block px-4 py-2 text-white hover:text-red-400 hover:bg-red-400/10">
                        ⚙️ Admin Panel
                      </Link>
                    )}
                    <button className="block w-full text-left px-4 py-2 text-white hover:text-red-400 hover:bg-red-400/10">
                      🚪 Logout
                    </button>
                  </>
                ) : (
                  <Link to="/auth/login" className="block px-4 py-2 text-white hover:text-red-400 hover:bg-red-400/10">
                    🔑 Login
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Menu */}
            <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-red-400/30">
            <nav className="flex flex-col gap-4">
              <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 bg-black/50 border border-red-400/50 rounded text-white placeholder:text-gray-400"
                />
                <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
                  🔍
                </button>
              </form>
              <Link to="/" className="text-white hover:text-red-400 transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-white hover:text-red-400 transition-colors">
                About
              </Link>
              <Link to="/support" className="text-white hover:text-red-400 transition-colors">
                Support
              </Link>
              <Link to="/cart" className="text-white hover:text-red-400 transition-colors">
                Cart ({cartItemsCount})
              </Link>
              <Link to="/wishlist" className="text-white hover:text-red-400 transition-colors">
                Wishlist ({wishlist.length})
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
