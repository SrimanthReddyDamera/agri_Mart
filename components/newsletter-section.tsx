"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Mail } from "lucide-react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      console.log("Newsletter signup:", email)
      toast({
        title: "Subscribed!",
        description: "You've successfully subscribed to our newsletter.",
      })
      setEmail("")
    } else {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
    }
  }

  return (
    <section className="py-12 md:py-16 bg-green-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <Mail className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Stay Updated with AgriMart</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest product updates, farming tips, and exclusive offers.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white/20 border-white/50 text-white placeholder:text-white/70 focus:ring-white focus:border-white"
            required
          />
          <Button type="submit" className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}
