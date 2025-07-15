import type { ApiConfig, ApiResponse, Product, User, Order, Category, Review, CartItem } from "../types"

// API Configuration for Grok AI Backend
const API_CONFIG: ApiConfig = {
  baseUrl: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
  endpoints: {
    auth: {
      login: "/auth/login",
      register: "/auth/register",
      logout: "/auth/logout",
      profile: "/auth/profile",
    },
    products: {
      list: "/products",
      detail: "/products/:id",
      search: "/products/search",
      categories: "/categories",
    },
    cart: {
      get: "/cart",
      add: "/cart/add",
      update: "/cart/update",
      remove: "/cart/remove",
      clear: "/cart/clear",
    },
    orders: {
      create: "/orders",
      list: "/orders",
      detail: "/orders/:id",
      track: "/orders/:id/track",
    },
    payments: {
      process: "/payments/process",
      verify: "/payments/verify",
      methods: "/payments/methods",
    },
    reviews: {
      list: "/reviews",
      create: "/reviews",
      update: "/reviews/:id",
      delete: "/reviews/:id",
    },
  },
}

class ApiService {
  private baseUrl: string
  private token: string | null = null

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl
    this.token = localStorage.getItem("authToken")
  }

  // Set authentication token
  setToken(token: string) {
    this.token = token
    localStorage.setItem("authToken", token)
  }

  // Remove authentication token
  removeToken() {
    this.token = null
    localStorage.removeItem("authToken")
  }

  // Generic API request method
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "API request failed")
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      }
    } catch (error) {
      console.error("API Error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  // Authentication APIs
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request(API_CONFIG.endpoints.auth.login, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(userData: any): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request(API_CONFIG.endpoints.auth.register, {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async logout(): Promise<ApiResponse<void>> {
    const result = await this.request(API_CONFIG.endpoints.auth.logout, {
      method: "POST",
    })
    this.removeToken()
    return result
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.request(API_CONFIG.endpoints.auth.profile)
  }

  // Product APIs
  async getProducts(params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }): Promise<ApiResponse<{ products: Product[]; totalPages: number; total: number }>> {
    const queryParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `${API_CONFIG.endpoints.products.list}?${queryParams.toString()}`
    return this.request(endpoint)
  }

  async getProduct(id: number): Promise<ApiResponse<Product>> {
    const endpoint = API_CONFIG.endpoints.products.detail.replace(":id", id.toString())
    return this.request(endpoint)
  }

  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    return this.request(`${API_CONFIG.endpoints.products.search}?q=${encodeURIComponent(query)}`)
  }

  async getCategories(): Promise<ApiResponse<Category[]>> {
    return this.request(API_CONFIG.endpoints.categories)
  }

  // Cart APIs
  async getCart(): Promise<ApiResponse<CartItem[]>> {
    return this.request(API_CONFIG.endpoints.cart.get)
  }

  async addToCart(productId: number, quantity = 1): Promise<ApiResponse<void>> {
    return this.request(API_CONFIG.endpoints.cart.add, {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    })
  }

  async updateCartItem(productId: number, quantity: number): Promise<ApiResponse<void>> {
    return this.request(API_CONFIG.endpoints.cart.update, {
      method: "PUT",
      body: JSON.stringify({ productId, quantity }),
    })
  }

  async removeFromCart(productId: number): Promise<ApiResponse<void>> {
    return this.request(API_CONFIG.endpoints.cart.remove, {
      method: "DELETE",
      body: JSON.stringify({ productId }),
    })
  }

  async clearCart(): Promise<ApiResponse<void>> {
    return this.request(API_CONFIG.endpoints.cart.clear, {
      method: "DELETE",
    })
  }

  // Order APIs
  async createOrder(orderData: {
    items: CartItem[]
    shippingAddress: any
    paymentMethod: string
    paymentDetails?: any
  }): Promise<ApiResponse<Order>> {
    return this.request(API_CONFIG.endpoints.orders.create, {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  }

  async getOrders(): Promise<ApiResponse<Order[]>> {
    return this.request(API_CONFIG.endpoints.orders.list)
  }

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    const endpoint = API_CONFIG.endpoints.orders.detail.replace(":id", id)
    return this.request(endpoint)
  }

  async trackOrder(id: string): Promise<ApiResponse<any>> {
    const endpoint = API_CONFIG.endpoints.orders.track.replace(":id", id)
    return this.request(endpoint)
  }

  // Payment APIs
  async processPayment(paymentData: any): Promise<ApiResponse<any>> {
    return this.request(API_CONFIG.endpoints.payments.process, {
      method: "POST",
      body: JSON.stringify(paymentData),
    })
  }

  async verifyPayment(paymentId: string): Promise<ApiResponse<any>> {
    return this.request(API_CONFIG.endpoints.payments.verify, {
      method: "POST",
      body: JSON.stringify({ paymentId }),
    })
  }

  async getPaymentMethods(): Promise<ApiResponse<any[]>> {
    return this.request(API_CONFIG.endpoints.payments.methods)
  }

  // Review APIs
  async getProductReviews(productId: number): Promise<ApiResponse<Review[]>> {
    return this.request(`${API_CONFIG.endpoints.reviews.list}?productId=${productId}`)
  }

  async createReview(reviewData: {
    productId: number
    rating: number
    title?: string
    comment: string
  }): Promise<ApiResponse<Review>> {
    return this.request(API_CONFIG.endpoints.reviews.create, {
      method: "POST",
      body: JSON.stringify(reviewData),
    })
  }

  async updateReview(id: string, reviewData: any): Promise<ApiResponse<Review>> {
    const endpoint = API_CONFIG.endpoints.reviews.update.replace(":id", id)
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(reviewData),
    })
  }

  async deleteReview(id: string): Promise<ApiResponse<void>> {
    const endpoint = API_CONFIG.endpoints.reviews.delete.replace(":id", id)
    return this.request(endpoint, {
      method: "DELETE",
    })
  }
}

// Export singleton instance
export const apiService = new ApiService()
export default apiService
