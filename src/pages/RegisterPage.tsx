"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../contexts/AppContext"
import type { RegisterForm } from "../types"

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    farmSize: "",
    cropTypes: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Partial<RegisterForm>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, isLoading, error } = useAuth()
  const navigate = useNavigate()

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterForm> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = "Enter valid Indian mobile number"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required"
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Enter valid 6-digit pincode"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to terms and conditions"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        address: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: "India",
        },
        farmDetails: {
          farmSize: formData.farmSize,
          cropTypes: formData.cropTypes,
        },
      }

      const result = await register(userData)

      if (result.success) {
        navigate("/")
      }
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof RegisterForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Join AgriMart Family</h1>
            <p className="text-gray-400">Create your account and start your farming journey with us</p>
          </div>

          <div className="bg-black/70 border border-red-400/30 rounded-lg p-8">
            {error && (
              <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 mb-6">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  👤 Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-black/50 border rounded focus:outline-none focus:border-red-400 text-white ${
                        errors.firstName ? "border-red-500" : "border-red-400/50"
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-white mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-black/50 border rounded focus:outline-none focus:border-red-400 text-white ${
                        errors.lastName ? "border-red-500" : "border-red-400/50"
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-white mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-black/50 border rounded focus:outline-none focus:border-red-400 text-white ${
                        errors.email ? "border-red-500" : "border-red-400/50"
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-white mb-2">Mobile Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-black/50 border rounded focus:outline-none focus:border-red-400 text-white ${
                        errors.phone ? "border-red-500" : "border-red-400/50"
                      }`}
                      placeholder="9876543210"
                      maxLength={10}
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">🔒 Account Security</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Password *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-black/50 border rounded focus:outline-none focus:border-red-400 text-white ${
                        errors.password ? "border-red-500" : "border-red-400/50"
                      }`}
                      placeholder="Create a strong password"
                    />
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-white mb-2">Confirm Password *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-black/50 border rounded focus:outline-none focus:border-red-400 text-white ${
                        errors.confirmPassword ? "border-red-500" : "border-red-400/50"
                      }`}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  📍 Address Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">Complete Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-3 py-2 bg-black/50 border rounded focus:outline-none focus:border-red-400 text-white ${
                        errors.address ? "border-red-500" : "border-red-400/50"
                      }`}
                      placeholder="House/Plot No., Street, Locality, Landmark"
                    />
                    {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 bg-black/50 border rounded focus:outline-none focus:border-red-400 text-white ${
                          errors.city ? "border-red-500" : "border-red-400/50"
                        }`}
                        placeholder="Your city"
                      />
                      {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-white mb-2">State *</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 bg-black/50 border rounded focus:outline-none focus:border-red-400 text-white ${
                          errors.state ? "border-red-500" : "border-red-400/50"
                        }`}
                      >
                        <option value="">Select State</option>
                        {indianStates.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <label className="block text-white mb-2">Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 bg-black/50 border rounded focus:outline-none focus:border-red-400 text-white ${
                          errors.pincode ? "border-red-500" : "border-red-400/50"
                        }`}
                        placeholder="123456"
                        maxLength={6}
                      />
                      {errors.pincode && <p className="text-red-400 text-sm mt-1">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Farming Information */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🌾 Farming Information (Optional)
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Farm Size (in acres)</label>
                    <input
                      type="text"
                      name="farmSize"
                      value={formData.farmSize}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-black/50 border border-red-400/50 rounded focus:outline-none focus:border-red-400 text-white"
                      placeholder="e.g., 5 acres"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Primary Crop Types</label>
                    <input
                      type="text"
                      name="cropTypes"
                      value={formData.cropTypes}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-black/50 border border-red-400/50 rounded focus:outline-none focus:border-red-400 text-white"
                      placeholder="e.g., Rice, Wheat, Cotton"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <span className="text-white text-sm">
                    I agree to the{" "}
                    <Link to="/terms" className="text-red-400 hover:underline">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-red-400 hover:underline">
                      Privacy Policy
                    </Link>
                    . I also consent to receive promotional emails and SMS from AgriMart.
                  </span>
                </label>
                {errors.agreeToTerms && <p className="text-red-400 text-sm mt-1">{errors.agreeToTerms}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || isLoading ? "Creating Account..." : "Create Account"}
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-red-400/30">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link to="/auth/login" className="text-red-400 hover:underline font-semibold">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
