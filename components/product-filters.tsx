"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Category } from "@/types"

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()
        if (data.success) {
          setCategories(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all")
    setMinPrice(searchParams.get("minPrice") || "")
    setMaxPrice(searchParams.get("maxPrice") || "")
  }, [searchParams])

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (selectedCategory !== "all") {
      params.set("category", selectedCategory)
    } else {
      params.delete("category")
    }
    if (minPrice) {
      params.set("minPrice", minPrice)
    } else {
      params.delete("minPrice")
    }
    if (maxPrice) {
      params.set("maxPrice", maxPrice)
    } else {
      params.delete("maxPrice")
    }
    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/products")
    setSelectedCategory("all")
    setMinPrice("")
    setMaxPrice("")
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <Label htmlFor="category" className="mb-2 block text-gray-700 font-medium">
          Category
        </Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id.toString()} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div>
        <Label className="mb-2 block text-gray-700 font-medium">Price Range</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2"
          />
          <span>-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button onClick={applyFilters} className="flex-1 bg-green-600 hover:bg-green-700">
          Apply Filters
        </Button>
        <Button onClick={clearFilters} variant="outline" className="flex-1 bg-transparent">
          Clear
        </Button>
      </div>
    </div>
  )
}
