"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { AppState, AppAction, Product, CartItem, WishlistItem } from "../types"
import { apiService } from "../services/api"

// Initial state
const initialState: AppState = {
  user: null,
  cart: [],
  wishlist: [],
  orders: [],
  products: [],
  categories: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
}

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }

    case "SET_LOADING":
      return { ...state, isLoading: action.payload }

    case "SET_ERROR":
      return { ...state, error: action.payload }

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
        return state
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

    case "SET_CATEGORIES":
      return { ...state, categories: action.payload }

    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload }

    case "ADD_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      }

    case "SET_ORDERS":
      return { ...state, orders: action.payload }

    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load initial data
  useEffect(() => {
    const initializeApp = async () => {
      dispatch({ type: "SET_LOADING", payload: true })

      try {
        // Check for existing auth token
        const token = localStorage.getItem("authToken")
        if (token) {
          apiService.setToken(token)
          const profileResponse = await apiService.getProfile()
          if (profileResponse.success && profileResponse.data) {
            dispatch({ type: "SET_USER", payload: profileResponse.data })
          }
        }

        // Load categories
        const categoriesResponse = await apiService.getCategories()
        if (categoriesResponse.success && categoriesResponse.data) {
          dispatch({ type: "SET_CATEGORIES", payload: categoriesResponse.data })
        }

        // Load initial products
        const productsResponse = await apiService.getProducts({ page: 1, limit: 12 })
        if (productsResponse.success && productsResponse.data) {
          dispatch({
            type: "SET_PRODUCTS",
            payload: {
              products: productsResponse.data.products,
              totalPages: productsResponse.data.totalPages,
            },
          })
        }

        // Load user-specific data if authenticated
        if (state.user) {
          const cartResponse = await apiService.getCart()
          if (cartResponse.success && cartResponse.data) {
            // Handle cart data from API
          }

          const ordersResponse = await apiService.getOrders()
          if (ordersResponse.success && ordersResponse.data) {
            dispatch({ type: "SET_ORDERS", payload: ordersResponse.data })
          }
        }
      } catch (error) {
        console.error("App initialization error:", error)
        dispatch({ type: "SET_ERROR", payload: "Failed to initialize application" })
      } finally {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    initializeApp()
  }, [])

  // Sync cart and wishlist with localStorage (fallback for offline functionality)
  useEffect(() => {
    const savedCart = localStorage.getItem("agrimart-cart")
    const savedWishlist = localStorage.getItem("agrimart-wishlist")

    if (savedCart && state.cart.length === 0) {
      try {
        const cart = JSON.parse(savedCart)
        cart.forEach((item: CartItem) => {
          dispatch({ type: "ADD_TO_CART", payload: item })
        })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }

    if (savedWishlist && state.wishlist.length === 0) {
      try {
        const wishlist = JSON.parse(savedWishlist)
        wishlist.forEach((item: WishlistItem) => {
          dispatch({ type: "ADD_TO_WISHLIST", payload: item })
        })
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error)
      }
    }
  }, [state.cart.length, state.wishlist.length])

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("agrimart-cart", JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    localStorage.setItem("agrimart-wishlist", JSON.stringify(state.wishlist))
  }, [state.wishlist])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}

// Helper hooks for specific functionality
export const useAuth = () => {
  const { state, dispatch } = useApp()

  const login = async (email: string, password: string) => {
    dispatch({ type: "SET_LOADING", payload: true })
    dispatch({ type: "SET_ERROR", payload: null })

    try {
      const response = await apiService.login(email, password)
      if (response.success && response.data) {
        apiService.setToken(response.data.token)
        dispatch({ type: "SET_USER", payload: response.data.user })
        return { success: true }
      } else {
        dispatch({ type: "SET_ERROR", payload: response.error || "Login failed" })
        return { success: false, error: response.error }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed"
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      return { success: false, error: errorMessage }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const register = async (userData: any) => {
    dispatch({ type: "SET_LOADING", payload: true })
    dispatch({ type: "SET_ERROR", payload: null })

    try {
      const response = await apiService.register(userData)
      if (response.success && response.data) {
        apiService.setToken(response.data.token)
        dispatch({ type: "SET_USER", payload: response.data.user })
        return { success: true }
      } else {
        dispatch({ type: "SET_ERROR", payload: response.error || "Registration failed" })
        return { success: false, error: response.error }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed"
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      return { success: false, error: errorMessage }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const logout = async () => {
    try {
      await apiService.logout()
      dispatch({ type: "SET_USER", payload: null })
      dispatch({ type: "CLEAR_CART" })
      dispatch({ type: "SET_ORDERS", payload: [] })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return {
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    login,
    register,
    logout,
  }
}

export const useCart = () => {
  const { state, dispatch } = useApp()

  const addToCart = async (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product })

    // Sync with backend if user is authenticated
    if (state.user) {
      try {
        await apiService.addToCart(product.id, 1)
      } catch (error) {
        console.error("Failed to sync cart with backend:", error)
      }
    }
  }

  const removeFromCart = async (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId })

    if (state.user) {
      try {
        await apiService.removeFromCart(productId)
      } catch (error) {
        console.error("Failed to sync cart removal with backend:", error)
      }
    }
  }

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      dispatch({ type: "UPDATE_CART_QUANTITY", payload: { id: productId, quantity } })

      if (state.user) {
        try {
          await apiService.updateCartItem(productId, quantity)
        } catch (error) {
          console.error("Failed to sync cart update with backend:", error)
        }
      }
    }
  }

  const clearCart = async () => {
    dispatch({ type: "CLEAR_CART" })

    if (state.user) {
      try {
        await apiService.clearCart()
      } catch (error) {
        console.error("Failed to sync cart clear with backend:", error)
      }
    }
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

  const removeFromWishlist = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: productId })
  }

  const isInWishlist = (productId: number) => {
    return state.wishlist.some((item) => item.id === productId)
  }

  return {
    wishlist: state.wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  }
}

export const useProducts = () => {
  const { state, dispatch } = useApp()

  const loadProducts = async (params?: {
    page?: number
    category?: string
    search?: string
    sortBy?: string
  }) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const response = await apiService.getProducts(params)
      if (response.success && response.data) {
        dispatch({
          type: "SET_PRODUCTS",
          payload: {
            products: response.data.products,
            totalPages: response.data.totalPages,
          },
        })
      }
    } catch (error) {
      console.error("Failed to load products:", error)
      dispatch({ type: "SET_ERROR", payload: "Failed to load products" })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const searchProducts = async (query: string) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const response = await apiService.searchProducts(query)
      if (response.success && response.data) {
        dispatch({
          type: "SET_PRODUCTS",
          payload: {
            products: response.data,
            totalPages: 1,
          },
        })
      }
    } catch (error) {
      console.error("Failed to search products:", error)
      dispatch({ type: "SET_ERROR", payload: "Failed to search products" })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  return {
    products: state.products,
    categories: state.categories,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    isLoading: state.isLoading,
    loadProducts,
    searchProducts,
  }
}
