"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
      <Input
        type="text"
        placeholder="Search agricultural products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-black/50 border-red-400 text-white placeholder:text-gray-400"
      />
      <Button type="submit" className="bg-red-600 hover:bg-red-700">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  )
}
