"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isFarmer: false,
    farmName: "",
    farmSize: "",
    cropsGrown: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      farmDetails: formData.isFarmer
        ? {
            farmName: formData.farmName,
            farmSize: formData.farmSize,
            cropsGrown: formData.cropsGrown.split(",").map((crop) => crop.trim()),
          }
        : undefined,
    }

    try {
      const success = await register(userData)
      if (success) {
        toast({
          title: "Registration Successful!",
          description: "Your account has been created. Welcome to AgriMart!",
        })
        router.push("/")
      } else {
        toast({
          title: "Registration Failed",
          description: "An account with this email might already exist or there was an error.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred during registration.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-900">Create Your AgriMart Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isFarmer"
                checked={formData.isFarmer}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isFarmer: !!checked }))}
              />
              <Label htmlFor="isFarmer">I am a farmer</Label>
            </div>

            {formData.isFarmer && (
              <div className="space-y-4 border p-4 rounded-md bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">Farm Details</h3>
                <div>
                  <Label htmlFor="farmName">Farm Name</Label>
                  <Input id="farmName" value={formData.farmName} onChange={handleChange} required={formData.isFarmer} />
                </div>
                <div>
                  <Label htmlFor="farmSize">Farm Size (e.g., 5 acres, 2 hectares)</Label>
                  <Input id="farmSize" value={formData.farmSize} onChange={handleChange} required={formData.isFarmer} />
                </div>
                <div>
                  <Label htmlFor="cropsGrown">Crops Grown (comma-separated)</Label>
                  <Textarea
                    id="cropsGrown"
                    value={formData.cropsGrown}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Wheat, Rice, Corn"
                    required={formData.isFarmer}
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Register Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-green-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
