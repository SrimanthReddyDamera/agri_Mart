import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/lib/models/Order"
import Product from "@/lib/models/Product"
import { authenticateRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const user = await authenticateRequest(request)
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const query = user.role === "admin" ? {} : { userId: user.userId }
    const skip = (page - 1) * limit

    const [orders, totalOrders] = await Promise.all([
      Order.find(query)
        .populate("userId", "firstName lastName email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments(query),
    ])

    const totalPages = Math.ceil(totalOrders / limit)

    return NextResponse.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: page,
          totalPages,
          totalOrders,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    })
  } catch (error: any) {
    console.error("Orders fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const user = await authenticateRequest(request)
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { items, shippingAddress, paymentMethod } = body

    // Validate products and calculate totals
    let subtotal = 0
    const orderItems = []

    for (const item of items) {
      const product = await Product.findById(item.productId)
      if (!product) {
        return NextResponse.json({ success: false, message: `Product ${item.productId} not found` }, { status: 400 })
      }

      if (product.stock < item.quantity) {
        return NextResponse.json({ success: false, message: `Insufficient stock for ${product.name}` }, { status: 400 })
      }

      const itemTotal = product.price * item.quantity
      subtotal += itemTotal

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
        sku: product.sku,
      })
    }

    const tax = subtotal * 0.18 // 18% GST
    const shipping = subtotal > 500 ? 0 : 50 // Free shipping above ₹500
    const total = subtotal + tax + shipping

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order
    const order = new Order({
      orderNumber,
      userId: user.userId,
      items: orderItems,
      subtotal,
      tax,
      shipping,
      total,
      paymentMethod,
      shippingAddress,
      status: paymentMethod === "cod" ? "confirmed" : "pending",
    })

    await order.save()

    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } })
    }

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      data: order,
    })
  } catch (error: any) {
    console.error("Order creation error:", error)
    return NextResponse.json({ success: false, message: "Failed to create order" }, { status: 500 })
  }
}
