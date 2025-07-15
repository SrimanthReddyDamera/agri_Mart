"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search agricultural products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 bg-black/50 border border-red-400 text-white placeholder:text-gray-400 rounded focus:outline-none focus:border-red-300"
      />
      <button type="submit" className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
        🔍
      </button>
    </form>
  )
}
