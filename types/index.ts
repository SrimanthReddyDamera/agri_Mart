import type { Types } from "mongoose"

export interface UserPayload {
  userId: string
  email: string
  role: "customer" | "admin"
}

export interface User {
  _id: Types.ObjectId | string
  firstName: string
  lastName: string
  email: string
  phone?: string
  password: string
  role: "customer" | "admin"
  isVerified: boolean
  address?: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  farmDetails?: {
    farmName?: string
    farmSize?: string
    cropsGrown?: string[]
  }
  resetPasswordToken?: string
  resetPasswordExpires?: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  comparePassword: (password: string) => Promise<boolean>
}

export interface Category {
  _id: Types.ObjectId | string
  name: string
  slug: string
  description?: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  _id: Types.ObjectId | string
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
  images?: string[]
  category: Types.ObjectId | string | Category // Can be populated
  stock: number
  sku: string
  rating: number
  reviews: number
  isFeatured: boolean
  isLimitedDeal: boolean
  specifications: Map<string, string>
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  productId: Types.ObjectId | string
  name: string
  price: number
  quantity: number
  image?: string
  sku?: string
  stock: number // Current stock of the product
}

export interface OrderItem {
  productId: Types.ObjectId | string
  name: string
  price: number
  quantity: number
  image?: string
  sku?: string
}

export interface Order {
  _id: Types.ObjectId | string
  orderNumber: string
  userId: Types.ObjectId | string | User // Can be populated
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  paymentMethod: string
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    phone: string
  }
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  deliveryDate?: Date
  trackingNumber?: string
  razorpayOrderId?: string
  razorpayPaymentId?: string
  razorpaySignature?: string
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  _id: Types.ObjectId | string
  productId: Types.ObjectId | string
  userId: Types.ObjectId | string | User // Can be populated
  rating: number
  title?: string
  comment: string
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}
