import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Cart from "@/lib/models/Cart"
import Product from "@/lib/models/Product"
import { authenticateRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const user = await authenticateRequest(request)
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const cart = await Cart.findOne({ userId: user.userId }).populate("items.productId", "stock").lean()
    
    if (!cart) {
      return NextResponse.json({ success: true, data: { items: [] } })
    }

    return NextResponse.json({ success: true, data: cart })
  } catch (error: any) {
    console.error("Cart fetch error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const user = await authenticateRequest(request)
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { productId, quantity } = await request.json()

    // Verify product exists and get current stock
    const product = await Product.findById(productId)
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    if (product.stock < quantity) {
      return NextResponse.json({ success: false, message: "Insufficient stock" }, { status: 400 })
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ userId: user.userId })
    
    if (!cart) {
      cart = new Cart({ userId: user.userId, items: [] })
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    )

    if (existingItemIndex > -1) {
      // Update quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity
      if (newQuantity > product.stock) {
        return NextResponse.json({ 
          success: false, 
          message: `Only ${product.stock} items available` 
        }, { status: 400 })
      }
      cart.items[existingItemIndex].quantity = newQuantity
    } else {
      // Add new item
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        sku: product.sku,
        stock: product.stock
      })
    }

    await cart.save()

    return NextResponse.json({ 
      success: true, 
      message: "Item added to cart",
      data: cart
    })
  } catch (error: any) {
    console.error("Add to cart error:", error)
    return NextResponse.json({ success: false, message: "Failed to add item to cart" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    
    const user = await authenticateRequest(request)
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { productId, quantity } = await request.json()

    const cart = await Cart.findOne({ userId: user.userId })
    if (!cart) {
      return NextResponse.json({ success: false, message: "Cart not found" }, { status: 404 })
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    )

    if (itemIndex === -1) {
      return NextResponse.json({ success: false, message: "Item not found in cart" }, { status: 404 })
    }

    if (quantity <= 0) {
      // Remove item
      cart.items.splice(itemIndex, 1)
    } else {
      // Update quantity
      const product = await Product.findById(productId)
      if (product && quantity > product.stock) {
        return NextResponse.json({ 
          success: false, 
          message: `Only ${product.stock} items available` 
        }, { status: 400 })
      }
      cart.items[itemIndex].quantity = quantity
    }

    await cart.save()

    return NextResponse.json({ 
      success: true, 
      message: "Cart updated",
      data: cart
    })
  } catch (error: any) {
    console.error("Update cart error:", error)
    return NextResponse.json({ success: false, message: "Failed to update cart" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()
    
    const user = await authenticateRequest(request)
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    const cart = await Cart.findOne({ userId: user.userId })
    if (!cart) {
      return NextResponse.json({ success: false, message: "Cart not found" }, { status: 404 })
    }

    if (productId) {
      // Remove specific item
      cart.items = cart.items.filter(item => item.productId.toString() !== productId)
    } else {
      // Clear entire cart
      cart.items = []
    }

    await cart.save()

    return NextResponse.json({ 
      success: true, 
      message: productId ? "Item removed from cart" : "Cart cleared",
      data: cart
    })
  } catch (error: any) {
    console.error("Remove from cart error:", error)
    return NextResponse.json({ success: false, message: "Failed to remove item from cart" }, { status: 500 })
  }
}