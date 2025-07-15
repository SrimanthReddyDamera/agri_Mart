import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/lib/models/Product"
import Review from "@/lib/models/Review"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const product = await Product.findById(params.id).populate("category", "name slug").lean()

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    // Get reviews for this product
    const reviews = await Review.find({ productId: params.id })
      .populate("userId", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()

    return NextResponse.json({
      success: true,
      data: {
        product,
        reviews,
      },
    })
  } catch (error: any) {
    console.error("Product fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const body = await request.json()
    const product = await Product.findByIdAndUpdate(params.id, { ...body, updatedAt: new Date() }, { new: true })

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    })
  } catch (error: any) {
    console.error("Product update error:", error)
    return NextResponse.json({ success: false, message: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const product = await Product.findByIdAndDelete(params.id)

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error: any) {
    console.error("Product deletion error:", error)
    return NextResponse.json({ success: false, message: "Failed to delete product" }, { status: 500 })
  }
}
