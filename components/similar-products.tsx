import { ProductCard } from "@/components/product-card"

const similarProducts = [
  {
    id: 2,
    name: "Organic Rice Seeds",
    description: "Premium organic rice seeds for sustainable farming",
    price: 249.99,
    originalPrice: 279.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "seeds",
    rating: 4.6,
    reviews: 89,
    discount: 11,
    isLimitedDeal: false,
  },
  {
    id: 3,
    name: "Corn Hybrid Seeds",
    description: "High-yield corn seeds with excellent disease resistance",
    price: 189.99,
    originalPrice: 219.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "seeds",
    rating: 4.4,
    reviews: 156,
    discount: 14,
    isLimitedDeal: true,
  },
  {
    id: 4,
    name: "Barley Seeds Premium",
    description: "Quality barley seeds for optimal grain production",
    price: 179.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "seeds",
    rating: 4.3,
    reviews: 67,
    discount: 10,
    isLimitedDeal: false,
  },
]

interface SimilarProductsProps {
  productId: string
}

export function SimilarProducts({ productId }: SimilarProductsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Similar Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
