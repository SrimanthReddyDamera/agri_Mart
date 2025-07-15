"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeartCrack, ArrowLeft, ShoppingCart, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/types"
import { useState } from "react"

// Mock wishlist data (replace with actual state/context management)
const mockWishlist: Product[] = [
  {
    _id: "65f7d8e2a7b8c9d0e1f2a3b4",
    name: "Organic Wheat Seeds (High Yield)",
    description: "Premium quality organic wheat seeds, ideal for high yield and disease resistance.",
    price: 1200,
    originalPrice: 1500,
    image:
      "https://images.unsplash.com/photo-1587495588041-511149191113?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "seeds-fertilizers",
    stock: 150,
    sku: "WHT-001",
    rating: 4.8,
    reviews: 120,
    isFeatured: true,
    isLimitedDeal: false,
    specifications: new Map(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "65f7d8e2a7b8c9d0e1f2a3b6",
    name: "Smart Irrigation System (Automated)",
    description: "Automated irrigation system with smart sensors for optimal water usage.",
    price: 25000,
    originalPrice: 28000,
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8dce0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "farm-equipment",
    stock: 30,
    sku: "IRR-005",
    rating: 4.5,
    reviews: 85,
    isFeatured: true,
    isLimitedDeal: true,
    specifications: new Map(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>(mockWishlist) // Use state for mock wishlist
  const { addToCart } = useCart()
  const { toast } = useToast()

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== productId))
    toast({
      title: "Removed from Wishlist",
      description: "Product has been removed from your wishlist.",
    })
  }

  const handleAddToCart = (product: Product) => {
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
    removeFromWishlist(product._id.toString()) // Remove from wishlist after adding to cart
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <HeartCrack className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">Start adding products you love to your wishlist!</p>
          <Link href="/products">
            <Button className="bg-green-600 hover:bg-green-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600">{wishlistItems.length} items in your wishlist</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item._id.toString()} className="bg-white shadow-md">
              <CardContent className="p-4 flex items-center gap-4">
                <Link href={`/products/${item._id}`}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-1">
                  <Link href={`/products/${item._id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                  <p className="text-green-600 font-bold text-xl">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromWishlist(item._id.toString())}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                    disabled={item.stock <= 0}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
