import { NextResponse } from "next/server"

export async function GET() {
  try {
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID

    if (!razorpayKeyId) {
      return NextResponse.json({ success: false, message: "Razorpay Key ID not configured" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      keyId: razorpayKeyId,
    })
  } catch (error: any) {
    console.error("Error fetching Razorpay key:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch Razorpay key" }, { status: 500 })
  }
}
