import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Category from "@/lib/models/Category"

export async function GET() {
  try {
    await connectDB()
    const categories = await Category.find({}).sort({ name: 1 }).lean()
    return NextResponse.json({ success: true, data: categories })
  } catch (error: any) {
    console.error("Categories fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    // In a real app, you'd add authentication/authorization here (e.g., check if user is admin)
    const body = await request.json()
    const { name, description, image } = body

    if (!name) {
      return NextResponse.json({ success: false, message: "Category name is required" }, { status: 400 })
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")

    const existingCategory = await Category.findOne({ $or: [{ name }, { slug }] })
    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category with this name or slug already exists" },
        { status: 409 },
      )
    }

    const category = new Category({ name, slug, description, image })
    await category.save()

    return NextResponse.json(
      { success: true, message: "Category created successfully", data: category },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Category creation error:", error)
    return NextResponse.json({ success: false, message: "Failed to create category" }, { status: 500 })
  }
}
