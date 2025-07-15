"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart, useApp } from "../contexts/AppContext"

export default function PaymentPage() {
  const { cart, clearCart, cartTotal, cartItemsCount } = useCart()
  const { dispatch } = useApp()
  const navigate = useNavigate()
  const [selectedPayment, setSelectedPayment] = useState("upi")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
    codAddress: "",
    codPhone: "",
  })

  const cartTotalINR = cartTotal
  const taxINR = cartTotalINR * 0.18
  const finalTotalINR = cartTotalINR + taxINR

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI Payment",
      icon: "📱",
      description: "Pay using Google Pay, PhonePe, Paytm, etc.",
      popular: true,
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: "💳",
      description: "Visa, Mastercard, RuPay cards accepted",
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: "🏦",
      description: "All major Indian banks supported",
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: "👛",
      description: "Paytm, Amazon Pay, Mobikwik",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: "🚚",
      description: "Pay when your order is delivered",
    },
  ]

  const handlePayment = async () => {
    if (cart.length === 0) return

    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: selectedPayment === "cod" ? "Confirmed" : "Processing",
      total: finalTotalINR,
      items: [...cart],
      paymentMethod: paymentMethods.find((m) => m.id === selectedPayment)?.name || selectedPayment,
      currency: "INR",
    }

    dispatch({ type: "ADD_ORDER", payload: order })
    clearCart()
    navigate(`/checkout/success?orderId=${order.id}`)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Cart is Empty</h1>
            <p className="text-gray-400 mb-8">Add some products to proceed with payment</p>
            <Link to="/">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg">
                ← Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center text-red-400 hover:text-red-300 mb-4">
            ← Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-white">Secure Checkout</h1>
          <p className="text-gray-400">Complete your payment securely</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-black/70 border border-red-400/30 rounded-lg p-6">
              <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">🛡️ Choose Payment Method</h2>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id}>
                    <label className="flex items-center space-x-3 p-4 border border-red-400/30 rounded-lg hover:border-red-400 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="text-red-600"
                      />
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <div className="text-white font-medium flex items-center gap-2">
                            {method.name}
                            {method.popular && (
                              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Popular</span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">{method.description}</p>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Details Form */}
            <div className="bg-black/70 border border-red-400/30 rounded-lg p-6">
              <h2 className="text-white text-xl font-semibold mb-4">Payment Details</h2>

              {selectedPayment === "upi" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@paytm / yourname@gpay"
                      value={paymentDetails.upiId}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
                      className="w-full px-3 py-2 bg-black/50 border border-red-400/50 text-white rounded focus:outline-none focus:border-red-400"
                    />
                  </div>
                  <div className="flex gap-4 justify-center">
                    <div className="w-16 h-10 bg-gray-600 rounded flex items-center justify-center text-xs">GPay</div>
                    <div className="w-16 h-10 bg-gray-600 rounded flex items-center justify-center text-xs">
                      PhonePe
                    </div>
                    <div className="w-16 h-10 bg-gray-600 rounded flex items-center justify-center text-xs">Paytm</div>
                  </div>
                </div>
              )}

              {selectedPayment === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-black/50 border border-red-400/50 text-white rounded focus:outline-none focus:border-red-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={paymentDetails.cardExpiry}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardExpiry: e.target.value })}
                        className="w-full px-3 py-2 bg-black/50 border border-red-400/50 text-white rounded focus:outline-none focus:border-red-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={paymentDetails.cardCvv}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardCvv: e.target.value })}
                        className="w-full px-3 py-2 bg-black/50 border border-red-400/50 text-white rounded focus:outline-none focus:border-red-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="Name as on card"
                      value={paymentDetails.cardName}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                      className="w-full px-3 py-2 bg-black/50 border border-red-400/50 text-white rounded focus:outline-none focus:border-red-400"
                    />
                  </div>
                </div>
              )}

              {selectedPayment === "cod" && (
                <div className="space-y-4">
                  <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4">
                    <p className="text-yellow-400 font-medium">Cash on Delivery</p>
                    <p className="text-gray-300 text-sm">
                      Pay ₹{finalTotalINR.toLocaleString()} when your order is delivered
                    </p>
                  </div>
                  <div>
                    <label className="block text-white mb-2">Delivery Address</label>
                    <input
                      type="text"
                      placeholder="Enter your complete address"
                      value={paymentDetails.codAddress}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, codAddress: e.target.value })}
                      className="w-full px-3 py-2 bg-black/50 border border-red-400/50 text-white rounded focus:outline-none focus:border-red-400"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Phone Number</label>
                    <input
                      type="text"
                      placeholder="Enter your phone number"
                      value={paymentDetails.codPhone}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, codPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-black/50 border border-red-400/50 text-white rounded focus:outline-none focus:border-red-400"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-black/70 border border-red-400/30 rounded-lg p-6 sticky top-24">
              <h2 className="text-white text-xl font-semibold mb-4">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-white font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <hr className="border-red-400/30 mb-4" />

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({cartItemsCount} items)</span>
                  <span>₹{cartTotalINR.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>GST (18%)</span>
                  <span>₹{taxINR.toLocaleString()}</span>
                </div>
              </div>

              <hr className="border-red-400/30 mb-4" />

              <div className="flex justify-between text-white font-bold text-lg mb-6">
                <span>Total</span>
                <span>₹{finalTotalINR.toLocaleString()}</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>✅ {selectedPayment === "cod" ? "Place Order" : `Pay ₹${finalTotalINR.toLocaleString()}`}</>
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-gray-400 text-xs">🛡️ Your payment information is secure and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
