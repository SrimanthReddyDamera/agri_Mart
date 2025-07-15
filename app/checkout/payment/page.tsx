"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Smartphone, Building2, Truck, Shield, CheckCircle, Wallet, Loader2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { formatPrice } from "@/lib/utils"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PaymentPage() {
  const { items: cart, clearCart, getTotalItems, getTotalPrice } = useCart()
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [selectedPayment, setSelectedPayment] = useState("upi")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
    bankAccount: "",
    ifscCode: "",
    codAddress: "",
    codPhone: "",
  })
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    phone: "",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login?redirect=/checkout/payment")
      toast({
        title: "Login Required",
        description: "Please log in to proceed with checkout.",
        variant: "destructive",
      })
    }
    if (user && user.address) {
      setShippingAddress({
        street: user.address.street || "",
        city: user.address.city || "",
        state: user.address.state || "",
        zipCode: user.address.zipCode || "",
        country: user.address.country || "India",
        phone: user.phone || "",
      })
    }
  }, [isAuthenticated, router, user, toast])

  const cartItemsCount = getTotalItems()
  const cartTotal = getTotalPrice()
  const shippingCost = cartTotal > 500 ? 0 : 50 // Free shipping over ₹500
  const taxRate = 0.18 // 18% GST
  const taxAmount = cartTotal * taxRate
  const finalTotal = cartTotal + shippingCost + taxAmount

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI Payment",
      icon: <Smartphone className="w-5 h-5" />,
      description: "Pay using Google Pay, PhonePe, Paytm, etc.",
      popular: true,
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Visa, Mastercard, RuPay cards accepted",
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: <Building2 className="w-5 h-5" />,
      description: "All major Indian banks supported",
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: <Wallet className="w-5 h-5" />,
      description: "Paytm, Amazon Pay, Mobikwik",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: <Truck className="w-5 h-5" />,
      description: "Pay when your order is delivered",
    },
  ]

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Add products to cart to proceed.",
        variant: "destructive",
      })
      return
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place an order.",
        variant: "destructive",
      })
      router.push("/auth/login?redirect=/checkout/payment")
      return
    }

    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.zipCode || !shippingAddress.phone) {
      toast({
        title: "Shipping Address Incomplete",
        description: "Please fill in all required shipping address fields.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shippingAddress: shippingAddress,
        paymentMethod: selectedPayment,
        totalAmount: finalTotal, // Pass total amount for server-side validation
      }

      // Create order on backend
      const createOrderRes = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`, // Ensure token is sent
        },
        body: JSON.stringify(orderData),
      })

      const orderResult = await createOrderRes.json()

      if (!orderResult.success) {
        throw new Error(orderResult.message || "Failed to create order.")
      }

      const orderId = orderResult.data.orderNumber // Backend returns orderNumber as ID

      if (selectedPayment === "cod") {
        // COD order is confirmed immediately
        router.push(`/checkout/success?orderId=${orderId}`)
        clearCart()
        return
      }

      // For online payments (UPI, Card, Netbanking, Wallet)
      const res = await loadRazorpayScript()
      if (!res) {
        toast({
          title: "Payment Error",
          description: "Razorpay SDK failed to load. Please try again.",
          variant: "destructive",
        })
        setIsProcessing(false)
        return
      }

      // Get Razorpay order details from backend
      const razorpayOrderRes = await fetch("/api/payments/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalTotal, orderId: orderId }),
      })
      const razorpayOrderData = await razorpayOrderRes.json()

      if (!razorpayOrderData.success) {
        throw new Error(razorpayOrderData.message || "Failed to create Razorpay order.")
      }

      const razorpayKeyRes = await fetch("/api/payments/razorpay-key")
      const razorpayKeyData = await razorpayKeyRes.json()

      if (!razorpayKeyData.success) {
        throw new Error(razorpayKeyData.message || "Failed to get Razorpay key.")
      }

      const options = {
        key: razorpayKeyData.keyId,
        amount: razorpayOrderData.data.amount,
        currency: razorpayOrderData.data.currency,
        name: "AgriMart",
        description: `Payment for Order #${orderId}`,
        order_id: razorpayOrderData.data.id,
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderId, // Pass our internal order ID
            }),
          })
          const verifyData = await verifyRes.json()

          if (verifyData.success) {
            toast({
              title: "Payment Successful!",
              description: "Your order has been placed.",
            })
            clearCart()
            router.push(`/checkout/success?orderId=${orderId}`)
          } else {
            toast({
              title: "Payment Failed",
              description: verifyData.message || "Payment verification failed.",
              variant: "destructive",
            })
            // Optionally update order status to failed on backend
          }
        },
        prefill: {
          name: user?.firstName + " " + user?.lastName,
          email: user?.email,
          contact: user?.phone || shippingAddress.phone,
        },
        notes: {
          address: `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.zipCode}`,
        },
        theme: {
          color: "#22C55E", // Green color for AgriMart
        },
      }

      const rzp1 = new window.Razorpay(options)
      rzp1.on("payment.failed", (response: any) => {
        toast({
          title: "Payment Failed",
          description: response.error.description || "Payment failed. Please try again.",
          variant: "destructive",
        })
        // Optionally update order status to failed on backend
      })
      rzp1.open()
    } catch (error: any) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout Error",
        description: error.message || "An error occurred during checkout. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products to proceed with payment</p>
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
          <Link href="/cart" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
          <p className="text-gray-600">Complete your payment securely</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      placeholder="123 Main St"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="AgriCity"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="Karnataka"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      placeholder="560001"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="9876543210"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Choose Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="relative">
                      <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-600 transition-colors">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="flex items-center gap-3 flex-1">
                          <div className="text-green-600">{method.icon}</div>
                          <div>
                            <Label htmlFor={method.id} className="text-gray-900 font-medium flex items-center gap-2">
                              {method.name}
                              {method.popular && (
                                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Popular</span>
                              )}
                            </Label>
                            <p className="text-gray-600 text-sm">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Details Form */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-900">Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPayment === "upi" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@paytm / yourname@gpay"
                        value={paymentDetails.upiId}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-4 justify-center">
                      <Image
                        src="/placeholder.svg?height=40&width=60"
                        alt="Google Pay"
                        width={60}
                        height={40}
                        className="rounded"
                      />
                      <Image
                        src="/placeholder.svg?height=40&width=60"
                        alt="PhonePe"
                        width={60}
                        height={40}
                        className="rounded"
                      />
                      <Image
                        src="/placeholder.svg?height=40&width=60"
                        alt="Paytm"
                        width={60}
                        height={40}
                        className="rounded"
                      />
                    </div>
                  </div>
                )}

                {selectedPayment === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input
                          id="cardExpiry"
                          placeholder="MM/YY"
                          value={paymentDetails.cardExpiry}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardExpiry: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardCvv">CVV</Label>
                        <Input
                          id="cardCvv"
                          placeholder="123"
                          value={paymentDetails.cardCvv}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardCvv: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="Name as on card"
                        value={paymentDetails.cardName}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {selectedPayment === "netbanking" && (
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      You will be redirected to your bank's secure website to complete the payment.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {["SBI", "HDFC", "ICICI", "Axis", "PNB", "BOI"].map((bank) => (
                        <Button key={bank} variant="outline" className="hover:bg-gray-100 bg-transparent">
                          {bank}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPayment === "wallet" && (
                  <div className="space-y-4">
                    <p className="text-gray-600">Choose your preferred digital wallet:</p>
                    <div className="grid grid-cols-2 gap-4">
                      {["Paytm", "Amazon Pay", "Mobikwik", "Freecharge"].map((wallet) => (
                        <Button key={wallet} variant="outline" className="hover:bg-gray-100 bg-transparent">
                          {wallet}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPayment === "cod" && (
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-700 font-medium">Cash on Delivery</p>
                      <p className="text-gray-600 text-sm">
                        Pay {formatPrice(finalTotal)} when your order is delivered
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-md sticky top-24">
              <CardHeader>
                <CardTitle className="text-gray-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.productId.toString()} className="flex items-center gap-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-gray-900 text-sm font-medium">{item.name}</p>
                        <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-gray-900 font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <Separator className="bg-gray-200" />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartItemsCount} items)</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="text-green-600">{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>GST (18%)</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>

                  {selectedPayment === "cod" && (
                    <div className="flex justify-between text-gray-700">
                      <span>COD Charges</span>
                      <span>{formatPrice(0)}</span>
                    </div>
                  )}
                </div>

                <Separator className="bg-gray-200" />

                <div className="flex justify-between text-gray-900 font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {selectedPayment === "cod" ? "Place Order" : `Pay ${formatPrice(finalTotal)}`}
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-gray-600 text-xs">
                    <Shield className="w-3 h-3 inline mr-1" />
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
