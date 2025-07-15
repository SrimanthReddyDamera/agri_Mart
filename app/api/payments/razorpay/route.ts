import { type NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR", orderId } = await request.json()

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${orderId}`,
      payment_capture: 1,
    }

    const razorpayOrder = await razorpay.orders.create(options)

    return NextResponse.json({
      success: true,
      data: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        // Note: We don't expose the key here - it will be fetched separately
      },
    })
  } catch (error: any) {
    console.error("Razorpay order creation error:", error)
    return NextResponse.json({ success: false, message: "Failed to create payment order" }, { status: 500 })
  }
}
