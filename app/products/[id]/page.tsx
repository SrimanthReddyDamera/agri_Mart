"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import type { Product, Review } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { formatPrice, calculateDiscount } from "@/lib/utils"
import ProductReviews from "@/components/product-reviews"
import SimilarProducts from "@/components/similar-products"

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
      const data = await response.json()

      if (data.success) {
        setProduct(data.data.product)
        setReviews(data.data.reviews || [])
      }
    } catch (error) {
      console.error("Failed to fetch product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

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
      quantity,
      image: product.image,
      sku: product.sku,
      stock: product.stock,
    })

    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Product link copied to clipboard.",
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
          <div className="space-y-4">
            <div className="bg-gray-200 animate-pulse rounded h-8 w-3/4"></div>
            <div className="bg-gray-200 animate-pulse rounded h-6 w-1/2"></div>
            <div className="bg-gray-200 animate-pulse rounded h-20 w-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const discount = calculateDiscount(product.originalPrice, product.price)
  const images = product.images && product.images.length > 0 ? product.images : [product.image]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">{discount}% OFF</Badge>
            )}
            {product.isLimitedDeal && (
              <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600">Limited Deal</Badge>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-green-600" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviews} reviews)
                </span>
              </div>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-green-600">{formatPrice(product.price)}</span>
            {discount > 0 && (
              <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-1"
                disabled={product.stock <= 0}
              >
                {[...Array(Math.min(10, product.stock))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleAddToCart} disabled={product.stock <= 0} className="flex-1" size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center space-x-3">
              <Truck className="h-6 w-6 text-green-600" />
              <div>
                <div className="font-medium text-sm">Free Delivery</div>
                <div className="text-xs text-gray-600">On orders above ₹500</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-green-600" />
              <div>
                <div className="font-medium text-sm">Quality Assured</div>
                <div className="text-xs text-gray-600">100% genuine products</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="h-6 w-6 text-green-600" />
              <div>
                <div className="font-medium text-sm">Easy Returns</div>
                <div className="text-xs text-gray-600">7-day return policy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                {/* Add more detailed description here */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              {Object.keys(product.specifications).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No specifications available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <ProductReviews productId={product._id} reviews={reviews} />
        </TabsContent>
      </Tabs>

      {/* Similar Products */}
      <SimilarProducts
        currentProductId={product._id}
        categoryId={typeof product.category === "string" ? product.category : product.category._id}
      />
    </div>
  )
}
