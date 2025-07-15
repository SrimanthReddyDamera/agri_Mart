import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/lib/models/Product"
import Category from "@/lib/models/Category"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const categorySlug = searchParams.get("category")
    const searchTerm = searchParams.get("search")
    const minPrice = Number.parseFloat(searchParams.get("minPrice") || "0")
    const maxPrice = Number.parseFloat(searchParams.get("maxPrice") || "9999999")
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1

    const query: any = {
      price: { $gte: minPrice, $lte: maxPrice },
    }

    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug })
      if (category) {
        query.category = category._id
      } else {
        return NextResponse.json({ success: true, data: { products: [], totalPages: 0, total: 0 } })
      }
    }

    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { sku: { $regex: searchTerm, $options: "i" } },
      ]
    }

    const skip = (page - 1) * limit

    const [products, totalProducts] = await Promise.all([
      Product.find(query)
        .populate("category", "name slug")
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(query),
    ])

    const totalPages = Math.ceil(totalProducts / limit)

    return NextResponse.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalProducts,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    })
  } catch (error: any) {
    console.error("Products fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    // In a real app, you'd add authentication/authorization here (e.g., check if user is admin)
    // const user = await authenticateRequest(request);
    // if (!user || user.role !== 'admin') {
    //   return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    // }

    const body = await request.json()
    const {
      name,
      description,
      price,
      originalPrice,
      image,
      images,
      category,
      stock,
      sku,
      isFeatured,
      isLimitedDeal,
      specifications,
    } = body

    // Basic validation
    if (!name || !description || !price || !category || !stock || !sku || !image) {
      return NextResponse.json({ success: false, message: "Missing required product fields" }, { status: 400 })
    }

    // Check if category exists
    const existingCategory = await Category.findById(category)
    if (!existingCategory) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 400 })
    }

    const product = new Product({
      name,
      description,
      price,
      originalPrice: originalPrice || price,
      image,
      images: images || [image],
      category,
      stock,
      sku,
      isFeatured: isFeatured || false,
      isLimitedDeal: isLimitedDeal || false,
      specifications: specifications || {},
    })

    await product.save()

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        data: product,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Product creation error:", error)
    if (error.code === 11000) {
      // Duplicate key error
      return NextResponse.json({ success: false, message: "Product with this SKU already exists" }, { status: 409 })
    }
    return NextResponse.json({ success: false, message: "Failed to create product" }, { status: 500 })
  }
}
