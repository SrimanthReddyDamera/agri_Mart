import ProductCard from "@/components/product-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Product } from "@/types"

async function getFeaturedProducts(): Promise<Product[]> {
  // In a real application, this would fetch from your API
  // For now, return mock data
  const products: Product[] = [
    {
      _id: "65f7d8e2a7b8c9d0e1f2a3b4",
      name: "Organic Wheat Seeds (High Yield)",
      description:
        "Premium quality organic wheat seeds, ideal for high yield and disease resistance. Suitable for all climates.",
      price: 1200,
      originalPrice: 1500,
      image:
        "https://images.unsplash.com/photo-1587495588041-511149191113?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "65f7d8e2a7b8c9d0e1f2a3b5", // Mock category ID
      stock: 150,
      sku: "WHT-001",
      rating: 4.8,
      reviews: 120,
      isFeatured: true,
      isLimitedDeal: false,
      specifications: new Map([
        ["Weight", "10 kg"],
        ["Germination Rate", "95%"],
        ["Harvest Time", "120 days"],
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "65f7d8e2a7b8c9d0e1f2a3b6",
      name: "Smart Irrigation System (Automated)",
      description: "Automated irrigation system with smart sensors for optimal water usage. Saves water and labor.",
      price: 25000,
      originalPrice: 28000,
      image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8dce0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "65f7d8e2a7b8c9d0e1f2a3b7", // Mock category ID
      stock: 30,
      sku: "IRR-005",
      rating: 4.5,
      reviews: 85,
      isFeatured: true,
      isLimitedDeal: true,
      specifications: new Map([
        ["Coverage Area", "2 acres"],
        ["Power Source", "Solar/Electric"],
        ["Control", "Mobile App"],
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "65f7d8e2a7b8c9d0e1f2a3b8",
      name: "Bio-Organic Fertilizer (50kg)",
      description: "Environmentally friendly fertilizer, enhances soil fertility and crop growth naturally.",
      price: 800,
      originalPrice: 950,
      image:
        "https://images.unsplash.com/photo-1587495588041-511149191113?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "65f7d8e2a7b8c9d0e1f2a3b5", // Mock category ID
      stock: 200,
      sku: "FERT-003",
      rating: 4.7,
      reviews: 90,
      isFeatured: true,
      isLimitedDeal: false,
      specifications: new Map([
        ["Weight", "50 kg"],
        ["Composition", "Organic Matter"],
        ["Application", "All Crops"],
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "65f7d8e2a7b8c9d0e1f2a3b9",
      name: "Mini Tractor (Compact Model)",
      description: "Compact and efficient mini tractor, perfect for small to medium-sized farms. Easy to operate.",
      price: 150000,
      originalPrice: 165000,
      image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8dce0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "65f7d8e2a7b8c9d0e1f2a3b7", // Mock category ID
      stock: 10,
      sku: "TRC-002",
      rating: 4.6,
      reviews: 55,
      isFeatured: true,
      isLimitedDeal: true,
      specifications: new Map([
        ["Engine Power", "25 HP"],
        ["Fuel Type", "Diesel"],
        ["Weight", "1200 kg"],
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
  return products
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link href="/products" className="text-green-600 hover:text-green-700 flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id.toString()} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
