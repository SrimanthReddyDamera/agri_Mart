"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "all", name: "All Products", icon: "🌾" },
  { id: "seeds", name: "Seeds & Saplings", icon: "🌱" },
  { id: "fertilizers", name: "Fertilizers", icon: "🧪" },
  { id: "tools", name: "Farm Tools", icon: "🔧" },
  { id: "equipment", name: "Equipment", icon: "🚜" },
  { id: "pesticides", name: "Pesticides", icon: "🛡️" },
  { id: "irrigation", name: "Irrigation", icon: "💧" },
]

interface CategoryFilterProps {
  selectedCategory?: string
}

export function CategoryFilter({ selectedCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <Link key={category.id} href={category.id === "all" ? "/" : `/?category=${category.id}`}>
          <Button
            variant={
              selectedCategory === category.id || (!selectedCategory && category.id === "all") ? "default" : "outline"
            }
            className={`${
              selectedCategory === category.id || (!selectedCategory && category.id === "all")
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "border-red-400 text-red-400 hover:bg-red-400 hover:text-white bg-black/50"
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </Button>
        </Link>
      ))}
    </div>
  )
}
