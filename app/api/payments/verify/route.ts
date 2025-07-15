import { type NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"
import crypto from "crypto"
import connectDB from "@/lib/mongodb"
import Order from "@/lib/models/Order"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = await request.json()

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex")

    const isAuthentic = expectedSignature === razorpay_signature

    if (isAuthentic) {
      // Update order status in your database
      const order = await Order.findOneAndUpdate(
        { orderNumber: orderId },
        {
          paymentStatus: "paid",
          status: "confirmed", // Or 'processing' depending on your flow
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
        { new: true },
      )

      if (!order) {
        return NextResponse.json({ success: false, message: "Order not found in database" }, { status: 404 })
      }

      return NextResponse.json({ success: true, message: "Payment verified successfully" })
    } else {
      return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("Razorpay verification error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
