"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductSort() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const sortBy = searchParams.get("sortBy") || "createdAt"
  const sortOrder = searchParams.get("sortOrder") || "desc"

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split("-")
    const params = new URLSearchParams(searchParams.toString())
    params.set("sortBy", newSortBy)
    params.set("sortOrder", newSortOrder)
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-700 text-sm">Sort by:</span>
      <Select value={`${sortBy}-${sortOrder}`} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt-desc">Newest Arrivals</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="rating-desc">Average Rating</SelectItem>
          <SelectItem value="reviews-desc">Most Reviewed</SelectItem>
          <SelectItem value="name-asc">Name: A-Z</SelectItem>
          <SelectItem value="name-desc">Name: Z-A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
