"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, ArrowLeft, Eye, Truck, CheckCircle, Clock, XCircle, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useEffect, useState } from "react"
import type { Order } from "@/types"
import { formatPrice, getStatusColor } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function OrdersPage() {
  const { user, loading: authLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/auth/login?redirect=/orders")
      } else {
        fetchOrders()
      }
    }
  }, [authLoading, isAuthenticated, router])

  const fetchOrders = async () => {
    setLoadingOrders(true)
    try {
      const response = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setOrders(data.data.orders)
      } else {
        console.error("Failed to fetch orders:", data.message)
        setOrders([])
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
      setOrders([])
    } finally {
      setLoadingOrders(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "confirmed":
      case "processing":
        return <Loader2 className="w-4 h-4 animate-spin" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  if (authLoading || loadingOrders) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-green-600" />
        <p className="ml-3 text-lg text-gray-700">Loading your orders...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Should redirect
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Orders Yet</h1>
          <p className="text-gray-600 mb-8">You haven't placed any orders yet. Start shopping!</p>
          <Link href="/products">
            <Button className="bg-green-600 hover:bg-green-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start Shopping
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
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600">{orders.length} orders found</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order._id.toString()} className="bg-white shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Order #{order.orderNumber}
                    </CardTitle>
                    <p className="text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getStatusColor(order.status)} text-white mb-2`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </Badge>
                    <p className="text-gray-900 font-bold text-lg">{formatPrice(order.total)}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.productId.toString()} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 font-medium">{item.name}</h4>
                        <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900 font-semibold">{formatPrice(item.price * item.quantity)}</p>
                        <p className="text-gray-600 text-sm">{formatPrice(item.price)} each</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                  <div className="text-gray-600">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </div>
                  <Button variant="outline" asChild>
                    <Link href={`/orders/${order._id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Link>
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
