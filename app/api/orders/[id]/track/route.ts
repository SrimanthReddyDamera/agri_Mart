import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/lib/models/Order"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const order = await Order.findOne({ orderNumber: params.id })
      .select("orderNumber status trackingNumber deliveryDate createdAt")
      .lean()

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 })
    }

    // Mock tracking details based on status
    const trackingDetails = []
    if (order.status === "pending") {
      trackingDetails.push({ status: "Order Placed", date: order.createdAt })
    } else if (order.status === "confirmed") {
      trackingDetails.push({ status: "Order Placed", date: order.createdAt })
      trackingDetails.push({
        status: "Order Confirmed",
        date: new Date(order.createdAt.getTime() + 1 * 60 * 60 * 1000),
      })
    } else if (order.status === "processing") {
      trackingDetails.push({ status: "Order Placed", date: order.createdAt })
      trackingDetails.push({
        status: "Order Confirmed",
        date: new Date(order.createdAt.getTime() + 1 * 60 * 60 * 1000),
      })
      trackingDetails.push({
        status: "Processing at Warehouse",
        date: new Date(order.createdAt.getTime() + 6 * 60 * 60 * 1000),
      })
    } else if (order.status === "shipped") {
      trackingDetails.push({ status: "Order Placed", date: order.createdAt })
      trackingDetails.push({
        status: "Order Confirmed",
        date: new Date(order.createdAt.getTime() + 1 * 60 * 60 * 1000),
      })
      trackingDetails.push({
        status: "Processing at Warehouse",
        date: new Date(order.createdAt.getTime() + 6 * 60 * 60 * 1000),
      })
      trackingDetails.push({
        status: `Shipped (Tracking: ${order.trackingNumber || "N/A"})`,
        date: new Date(order.createdAt.getTime() + 24 * 60 * 60 * 1000),
      })
    } else if (order.status === "delivered") {
      trackingDetails.push({ status: "Order Placed", date: order.createdAt })
      trackingDetails.push({
        status: "Order Confirmed",
        date: new Date(order.createdAt.getTime() + 1 * 60 * 60 * 1000),
      })
      trackingDetails.push({
        status: "Processing at Warehouse",
        date: new Date(order.createdAt.getTime() + 6 * 60 * 60 * 1000),
      })
      trackingDetails.push({
        status: `Shipped (Tracking: ${order.trackingNumber || "N/A"})`,
        date: new Date(order.createdAt.getTime() + 24 * 60 * 60 * 1000),
      })
      trackingDetails.push({
        status: "Delivered",
        date: order.deliveryDate || new Date(order.createdAt.getTime() + 48 * 60 * 60 * 1000),
      })
    } else if (order.status === "cancelled") {
      trackingDetails.push({ status: "Order Placed", date: order.createdAt })
      trackingDetails.push({ status: "Order Cancelled", date: new Date() })
    }

    return NextResponse.json({
      success: true,
      data: {
        orderNumber: order.orderNumber,
        currentStatus: order.status,
        trackingNumber: order.trackingNumber,
        deliveryDate: order.deliveryDate,
        history: trackingDetails,
      },
    })
  } catch (error: any) {
    console.error("Order tracking error:", error)
    return NextResponse.json({ success: false, message: "Failed to track order" }, { status: 500 })
  }
}
