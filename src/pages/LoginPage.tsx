"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../contexts/AppContext"
import type { LoginForm } from "../types"

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"customer" | "admin">("customer")
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Partial<LoginForm>>({})

  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginForm> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      const result = await login(formData.email, formData.password)

      if (result.success) {
        // Redirect based on user role or to intended page
        if (activeTab === "admin") {
          navigate("/admin")
        } else {
          navigate("/")
        }
      }
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof LoginForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleDemoLogin = (type: "customer" | "admin") => {
    const demoCredentials = {
      customer: { email: "customer@agrimart.com", password: "demo123" },
      admin: { email: "admin@agrimart.com", password: "admin123" },
    }

    setFormData(demoCredentials[type])
    setActiveTab(type)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/70 border border-red-400/30 rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to your AgriMart account</p>
        </div>

        {/* Demo Login Buttons */}
        <div className="mb-6 space-y-2">
          <p className="text-gray-400 text-sm text-center">Quick Demo Login:</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleDemoLogin("customer")}
              className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
            >
              👤 Customer Demo
            </button>
            <button
              onClick={() => handleDemoLogin("admin")}
              className="flex-1 py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm"
            >
              🛡️ Admin Demo
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab("customer")}
            className={`flex-1 py-2 px-4 rounded-l-lg border ${
              activeTab === "customer"
                ? "bg-red-600 text-white border-red-600"
                : "bg-black/50 text-gray-400 border-red-400/50"
            }`}
          >
            👤 Customer
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`flex-1 py-2 px-4 rounded-r-lg border ${
              activeTab === "admin"
                ? "bg-red-600 text-white border-red-600"
                : "bg-black/50 text-gray-400 border-red-400/50"
            }`}
          >
            🛡️ Admin
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">{activeTab === "admin" ? "Admin Email" : "Email"}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-black/50 border rounded focus:outline-none focus:border-red-400 text-white ${
                errors.email ? "border-red-500" : "border-red-400/50"
              }`}
              placeholder={activeTab === "admin" ? "admin@agrimart.com" : "your.email@example.com"}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-white mb-2">{activeTab === "admin" ? "Admin Password" : "Password"}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-black/50 border rounded focus:outline-none focus:border-red-400 text-white ${
                errors.password ? "border-red-500" : "border-red-400/50"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-400 text-sm">Remember me</span>
            </label>
            <Link to="/auth/forgot-password" className="text-red-400 hover:underline text-sm">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : `Sign In as ${activeTab === "admin" ? "Admin" : "Customer"}`}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-red-400 hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-gray-400 text-xs mt-2">Use demo buttons above for quick testing</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
