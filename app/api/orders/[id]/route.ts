import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/lib/models/Order"
import { authenticateRequest } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const user = await authenticateRequest(request)
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const order = await Order.findById(params.id).populate("userId", "firstName lastName email").lean()

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 })
    }

    // Ensure user can only view their own orders unless they are an admin
    if (user.role !== "admin" && order.userId._id.toString() !== user.userId) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error: any) {
    console.error("Order fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const user = await authenticateRequest(request)
    if (!user || user.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { status, trackingNumber, deliveryDate } = body

    const updateFields: any = { updatedAt: new Date() }
    if (status) updateFields.status = status
    if (trackingNumber) updateFields.trackingNumber = trackingNumber
    if (deliveryDate) updateFields.deliveryDate = deliveryDate

    const order = await Order.findByIdAndUpdate(params.id, updateFields, { new: true }).lean()

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      data: order,
    })
  } catch (error: any) {
    console.error("Order update error:", error)
    return NextResponse.json({ success: false, message: "Failed to update order" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const user = await authenticateRequest(request)
    if (!user || user.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const order = await Order.findByIdAndDelete(params.id)

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    })
  } catch (error: any) {
    console.error("Order deletion error:", error)
    return NextResponse.json({ success: false, message: "Failed to delete order" }, { status: 500 })
  }
}
