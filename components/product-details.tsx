"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, Share2, Clock, Shield, Truck } from "lucide-react"

// Mock product data
const mockProduct = {
  id: 1,
  name: "Premium Wheat Seeds",
  description:
    "High-yield wheat seeds specially developed for optimal harvest. These premium quality seeds are disease-resistant and suitable for various soil conditions. Perfect for both small-scale and commercial farming.",
  price: 299.99,
  originalPrice: 349.99,
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
  category: "seeds",
  rating: 4.5,
  reviews: 128,
  discount: 15,
  isLimitedDeal: true,
  inStock: true,
  specifications: {
    "Seed Type": "Hybrid Wheat",
    "Germination Rate": "95%+",
    "Maturity Period": "120-130 days",
    "Yield Potential": "45-50 quintals/hectare",
    "Suitable Season": "Rabi",
    "Package Size": "10 kg",
  },
}

interface ProductDetailsProps {
  productId: string
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative">
          <Image
            src={mockProduct.images[selectedImage] || "/placeholder.svg"}
            alt={mockProduct.name}
            width={500}
            height={500}
            className="w-full h-96 object-cover rounded-lg"
          />
          {mockProduct.discount > 0 && (
            <Badge className="absolute top-4 left-4 bg-red-600 text-white text-lg px-3 py-1">
              -{mockProduct.discount}%
            </Badge>
          )}
          {mockProduct.isLimitedDeal && (
            <Badge className="absolute top-4 right-4 bg-orange-600 text-white">
              <Clock className="w-4 h-4 mr-1" />
              Limited Deal
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          {mockProduct.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`border-2 rounded-lg overflow-hidden ${
                selectedImage === index ? "border-red-400" : "border-gray-600"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${mockProduct.name} ${index + 1}`}
                width={80}
                height={80}
                className="w-20 h-20 object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{mockProduct.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-white ml-1">{mockProduct.rating}</span>
            </div>
            <span className="text-gray-400">({mockProduct.reviews} reviews)</span>
            <Badge variant="outline" className="border-green-400 text-green-400">
              {mockProduct.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-red-400 font-bold text-3xl">${mockProduct.price}</span>
          {mockProduct.originalPrice > mockProduct.price && (
            <span className="text-gray-500 line-through text-xl">${mockProduct.originalPrice}</span>
          )}
          <span className="text-green-400 font-semibold">
            Save ${(mockProduct.originalPrice - mockProduct.price).toFixed(2)}
          </span>
        </div>

        <p className="text-gray-300 leading-relaxed">{mockProduct.description}</p>

        <Card className="bg-black/50 border-red-400/30">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3">Product Specifications</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(mockProduct.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-400">{key}:</span>
                  <span className="text-white">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white">Quantity:</span>
            <div className="flex items-center border border-red-400 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-white hover:bg-red-600"
              >
                -
              </button>
              <span className="px-4 py-1 text-white bg-black">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 text-white hover:bg-red-600">
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-lg py-3">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
          <Button variant="outline" className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="outline" className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Quality Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Free Shipping</span>
          </div>
        </div>
      </div>
    </div>
  )
}
