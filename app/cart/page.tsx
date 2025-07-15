"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function CartPage() {
  const { items: cart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const cartItemsCount = getTotalItems()
  const cartTotal = getTotalPrice()
  const shippingCost = cartTotal > 500 ? 0 : 50 // Free shipping over ₹500
  const taxRate = 0.18 // 18% GST
  const taxAmount = cartTotal * taxRate
  const finalTotal = cartTotal + shippingCost + taxAmount

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before proceeding to checkout.",
        variant: "destructive",
      })
      return
    }
    
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to proceed with checkout.",
        variant: "destructive",
      })
      router.push("/auth/login?redirect=/checkout/payment")
      return
    }
    
    router.push("/checkout/payment")
  }

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId)
    toast({
      title: "Item Removed",
      description: "Product has been removed from your cart.",
    })
  }

  const handleUpdateQuantity = (productId: string, newQuantity: number, stock: number) => {
    if (newQuantity > stock) {
      toast({
        title: "Insufficient Stock",
        description: `Only ${stock} units available for this product.`,
        variant: "destructive",
      })
      updateQuantity(productId, stock)
      return
    }
    updateQuantity(productId, newQuantity)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products to your cart to get started!</p>
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
          <Link href="/products" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600">{cartItemsCount} items in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.productId.toString()} className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Link href={`/products/${item.productId}`}>
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>

                    <div className="flex-1">
                      <Link href={`/products/${item.productId}`}>
                        <h3 className="text-gray-900 font-semibold text-lg hover:text-green-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-2">SKU: {item.sku}</p>
                      <p className="text-green-600 font-bold text-xl">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.productId.toString(), item.quantity - 1, item.stock)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(
                              item.productId.toString(),
                              Number.parseInt(e.target.value) || 1,
                              item.stock,
                            )
                          }
                          className="w-16 text-center"
                          min="1"
                          max={item.stock}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.productId.toString(), item.quantity + 1, item.stock)}
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveItem(item.productId.toString())}
                        className="text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      {/* Item Total */}
                      <p className="text-gray-900 font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-500 hover:bg-red-50 hover:text-red-600 bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-md sticky top-24">
              <CardHeader>
                <CardTitle className="text-gray-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cartItemsCount} items)</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>GST (18%)</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-between text-gray-900 font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3"
                >
                  Proceed to Payment
                </Button>

                <p className="text-gray-600 text-sm text-center">Free shipping on orders over {formatPrice(500)}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
