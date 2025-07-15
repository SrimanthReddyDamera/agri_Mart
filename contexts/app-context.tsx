"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

// Types
interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
  category: string
  rating: number
  reviews: number
  discount: number
  isLimitedDeal: boolean
  stock: number
  sku: string
}

interface CartItem extends Product {
  quantity: number
}

interface WishlistItem extends Product {}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: string
  total: number
  items: CartItem[]
  paymentMethod: string
  currency: string
}

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "customer" | "admin"
  isVerified: boolean
}

interface AppState {
  user: User | null
  cart: CartItem[]
  wishlist: WishlistItem[]
  orders: Order[]
  products: Product[]
  currentPage: number
  totalPages: number
  isLoading: boolean
  token: string | null
}

// Actions
type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_TOKEN"; payload: string | null }
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_CART_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "ADD_TO_WISHLIST"; payload: Product }
  | { type: "REMOVE_FROM_WISHLIST"; payload: string }
  | { type: "SET_PRODUCTS"; payload: { products: Product[]; totalPages: number } }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "SET_LOADING"; payload: boolean }

// Initial state
const initialState: AppState = {
  user: null,
  cart: [],
  wishlist: [],
  orders: [],
  products: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  token: null,
}

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }

    case "SET_TOKEN":
      return { ...state, token: action.payload }

    case "ADD_TO_CART":
      const existingCartItem = state.cart.find((item) => item.id === action.payload.id)
      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }

    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
        ),
      }

    case "CLEAR_CART":
      return { ...state, cart: [] }

    case "ADD_TO_WISHLIST":
      const existingWishlistItem = state.wishlist.find((item) => item.id === action.payload.id)
      if (existingWishlistItem) {
        return state // Item already in wishlist
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      }

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== action.payload),
      }

    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload.products,
        totalPages: action.payload.totalPages,
      }

    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload }

    case "ADD_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      }

    case "SET_LOADING":
      return { ...state, isLoading: action.payload }

    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

// Provider
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("agrimart-cart")
    const savedWishlist = localStorage.getItem("agrimart-wishlist")
    const savedUser = localStorage.getItem("agrimart-user")
    const savedOrders = localStorage.getItem("agrimart-orders")
    const savedToken = localStorage.getItem("agrimart-token")

    if (savedCart) {
      const cart = JSON.parse(savedCart)
      cart.forEach((item: CartItem) => {
        dispatch({ type: "ADD_TO_CART", payload: item })
      })
    }

    if (savedWishlist) {
      const wishlist = JSON.parse(savedWishlist)
      wishlist.forEach((item: WishlistItem) => {
        dispatch({ type: "ADD_TO_WISHLIST", payload: item })
      })
    }

    if (savedUser) {
      dispatch({ type: "SET_USER", payload: JSON.parse(savedUser) })
    }

    if (savedOrders) {
      const orders = JSON.parse(savedOrders)
      orders.forEach((order: Order) => {
        dispatch({ type: "ADD_ORDER", payload: order })
      })
    }

    if (savedToken) {
      dispatch({ type: "SET_TOKEN", payload: savedToken })
    }
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("agrimart-cart", JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    localStorage.setItem("agrimart-wishlist", JSON.stringify(state.wishlist))
  }, [state.wishlist])

  useEffect(() => {
    localStorage.setItem("agrimart-user", JSON.stringify(state.user))
  }, [state.user])

  useEffect(() => {
    localStorage.setItem("agrimart-orders", JSON.stringify(state.orders))
  }, [state.orders])

  useEffect(() => {
    if (state.token) {
      localStorage.setItem("agrimart-token", state.token)
    } else {
      localStorage.removeItem("agrimart-token")
    }
  }, [state.token])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

// Hook
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}

// Helper functions
export const useCart = () => {
  const { state, dispatch } = useApp()

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product })
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      dispatch({ type: "UPDATE_CART_QUANTITY", payload: { id: productId, quantity } })
    }
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const cartTotal = state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0)

  return {
    cart: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemsCount,
  }
}

export const useWishlist = () => {
  const { state, dispatch } = useApp()

  const addToWishlist = (product: Product) => {
    dispatch({ type: "ADD_TO_WISHLIST", payload: product })
  }

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: productId })
  }

  const isInWishlist = (productId: string) => {
    return state.wishlist.some((item) => item.id === productId)
  }

  return {
    wishlist: state.wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  }
}

export const useAuth = () => {
  const { state, dispatch } = useApp()

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        dispatch({ type: "SET_USER", payload: data.user })
        dispatch({ type: "SET_TOKEN", payload: data.token })
        return { success: true, message: data.message }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      return { success: false, message: "Login failed. Please try again." }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const register = async (userData: any) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (data.success) {
        dispatch({ type: "SET_USER", payload: data.user })
        dispatch({ type: "SET_TOKEN", payload: data.token })
        return { success: true, message: data.message }
      } else {
        return { success: false, message: data.message }
      }
    } catch (error) {
      return { success: false, message: "Registration failed. Please try again." }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      dispatch({ type: "SET_USER", payload: null })
      dispatch({ type: "SET_TOKEN", payload: null })
      dispatch({ type: "CLEAR_CART" })
    }
  }

  return {
    user: state.user,
    token: state.token,
    isLoading: state.isLoading,
    login,
    register,
    logout,
  }
}
