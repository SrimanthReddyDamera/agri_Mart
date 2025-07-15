// Core Types for Backend Integration
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
  images?: string[]
  category: string
  rating: number
  reviews: number
  discount: number
  isLimitedDeal: boolean
  stock: number
  sku?: string
  specifications?: Record<string, any>
  createdAt?: string
  updatedAt?: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface WishlistItem extends Product {}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: "customer" | "admin"
  address?: Address
  farmDetails?: FarmDetails
  createdAt?: string
  updatedAt?: string
}

export interface Address {
  street: string
  city: string
  state: string
  pincode: string
  country: string
}

export interface FarmDetails {
  farmSize?: string
  cropTypes?: string
  farmingExperience?: string
}

export interface Order {
  id: string
  userId: string
  orderNumber: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: CartItem[]
  paymentMethod?: string
  paymentStatus?: "pending" | "paid" | "failed" | "refunded"
  shippingAddress?: Address
  currency?: string
  createdAt?: string
  updatedAt?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description?: string
}

export interface Review {
  id: string
  productId: number
  userId: string
  userName: string
  rating: number
  title?: string
  comment: string
  isVerified?: boolean
  createdAt: string
}

// API Endpoints Configuration
export interface ApiConfig {
  baseUrl: string
  endpoints: {
    auth: {
      login: string
      register: string
      logout: string
      profile: string
    }
    products: {
      list: string
      detail: string
      search: string
      categories: string
    }
    cart: {
      get: string
      add: string
      update: string
      remove: string
      clear: string
    }
    orders: {
      create: string
      list: string
      detail: string
      track: string
    }
    payments: {
      process: string
      verify: string
      methods: string
    }
    reviews: {
      list: string
      create: string
      update: string
      delete: string
    }
  }
}

// Form Types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  address: string
  city: string
  state: string
  pincode: string
  farmSize?: string
  cropTypes?: string
  agreeToTerms: boolean
}

export interface PaymentForm {
  method: "upi" | "card" | "netbanking" | "wallet" | "cod"
  upiId?: string
  cardNumber?: string
  cardExpiry?: string
  cardCvv?: string
  cardName?: string
  bankCode?: string
  walletProvider?: string
  codAddress?: string
  codPhone?: string
}

// State Management Types
export interface AppState {
  user: User | null
  cart: CartItem[]
  wishlist: WishlistItem[]
  orders: Order[]
  products: Product[]
  categories: Category[]
  currentPage: number
  totalPages: number
  isLoading: boolean
  error: string | null
}

export type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_CART_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "ADD_TO_WISHLIST"; payload: Product }
  | { type: "REMOVE_FROM_WISHLIST"; payload: number }
  | { type: "SET_PRODUCTS"; payload: { products: Product[]; totalPages: number } }
  | { type: "SET_CATEGORIES"; payload: Category[] }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "SET_ORDERS"; payload: Order[] }
