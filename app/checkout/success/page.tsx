"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Home, Loader2 } from "lucide-react"
import type { Order } from "@/types"
import { formatPrice } from "@/lib/utils"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId)
    } else {
      setLoading(false)
    }
  }, [orderId])

  const fetchOrderDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setOrder(data.data)
      } else {
        console.error("Failed to fetch order details:", data.message)
      }
    } catch (error) {
      console.error("Error fetching order details:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <Loader2 className="h-10 w-10 animate-spin text-green-600" />
        <p className="ml-3 text-lg text-gray-700">Loading order details...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">The order details could not be retrieved.</p>
          <Link href="/">
            <Button className="bg-green-600 hover:bg-green-700">
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <Card className="w-full max-w-2xl bg-white shadow-lg text-center p-8">
        <CardContent className="space-y-6">
          <CheckCircle className="w-24 h-24 text-green-600 mx-auto" />
          <h1 className="text-4xl font-bold text-gray-900">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-700">
            Thank you for your purchase,{" "}
            {order.userId && typeof order.userId === "object" ? order.userId.firstName : "customer"}!
          </p>
          <p className="text-gray-600">
            Your order number is: <span className="font-semibold text-gray-900">{order.orderNumber}</span>
          </p>

          <div className="border-t border-b border-gray-200 py-4 my-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-2 text-left max-w-sm mx-auto">
              <div className="flex justify-between text-gray-700">
                <span>Total Items:</span>
                <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping:</span>
                <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (GST):</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between text-gray-900 font-bold text-xl pt-2">
                <span>Grand Total:</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600">You will receive an email confirmation shortly with your order details.</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link href="/orders">
              <Button className="bg-green-600 hover:bg-green-700">
                <Package className="w-4 h-4 mr-2" />
                View My Orders
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
