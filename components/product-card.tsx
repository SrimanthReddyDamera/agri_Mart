"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart } from "lucide-react"
import type { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { formatPrice, calculateDiscount } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      sku: product.sku,
      stock: product.stock,
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const discount = calculateDiscount(product.originalPrice, product.price)

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Link href={`/products/${product._id}`}>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {discount > 0 && <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">{discount}% OFF</Badge>}

          {product.isLimitedDeal && (
            <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">Limited Deal</Badge>
          )}

          <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>

        <div className="p-4">
          <Link href={`/products/${product._id}`}>
            <h3 className="font-semibold text-gray-900 mb-2 hover:text-green-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-green-600">{formatPrice(product.price)}</span>
              {discount > 0 && (
                <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <span className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <Button onClick={handleAddToCart} disabled={product.stock <= 0} className="w-full" size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
