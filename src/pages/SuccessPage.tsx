"use client"

import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useApp } from "../contexts/AppContext"

export default function SuccessPage() {
  const { state } = useApp()
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (orderId) {
      const foundOrder = state.orders.find((o) => o.id === orderId)
      setOrder(foundOrder)
    }
  }, [orderId, state.orders])

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✅</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-300 text-lg">Thank you for your purchase</p>
          </div>

          {/* Order Details */}
          {order && (
            <div className="bg-black/70 border border-red-400/30 rounded-lg p-6 mb-8">
              <h2 className="text-white text-xl font-semibold mb-4 flex items-center justify-center gap-2">
                📦 Order Details
              </h2>

              <div className="grid grid-cols-2 gap-4 text-left mb-4">
                <div>
                  <p className="text-gray-400">Order ID</p>
                  <p className="text-white font-semibold">{order.id}</p>
                </div>
                <div>
                  <p className="text-gray-400">Order Date</p>
                  <p className="text-white font-semibold">{order.date}</p>
                </div>
                <div>
                  <p className="text-gray-400">Payment Method</p>
                  <p className="text-white font-semibold">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Amount</p>
                  <p className="text-white font-semibold">₹{order.total.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-4 mb-4">
                <p className="text-green-400 font-medium">
                  {order.paymentMethod === "Cash on Delivery"
                    ? "Your order has been confirmed! Pay when delivered."
                    : "Payment successful! Your order is being processed."}
                </p>
              </div>

              <div className="text-left">
                <p className="text-gray-400 mb-2">Items Ordered ({order.items.length})</p>
                <div className="space-y-2">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center p-2 bg-black/30 rounded">
                      <span className="text-white">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="text-white">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/orders">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold">
                  📦 Track Your Order
                </button>
              </Link>

              <Link to="/">
                <button className="border border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-6 py-3 rounded-lg font-semibold">
                  🔄 Buy Again
                </button>
              </Link>
            </div>

            <Link to="/">
              <button className="text-red-400 hover:text-red-300 px-6 py-3">🏠 Continue Shopping →</button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-2">
              We'll send you shipping confirmation and tracking information via email.
            </p>
            <p className="text-gray-400">
              Need help?{" "}
              <Link to="/support" className="text-red-400 hover:underline">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
