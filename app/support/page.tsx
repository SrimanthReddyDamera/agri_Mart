"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MessageCircle, Phone, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SupportPage() {
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Support request:", supportForm)
    toast({
      title: "Support Request Sent!",
      description: "We have received your message and will get back to you within 24 hours.",
    })
    // Reset form
    setSupportForm({
      name: "",
      email: "",
      category: "",
      subject: "",
      message: "",
    })
  }

  const faqs = [
    {
      question: "How do I track my order?",
      answer:
        'You can track your order by logging into your account and visiting the "My Orders" section. You will also receive tracking information via email once your order ships.',
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 7-day return policy for most products. Items must be in original condition and packaging. Seeds and perishable items may have different return policies.",
    },
    {
      question: "Do you offer bulk discounts?",
      answer:
        "Yes, we offer bulk discounts for large orders. Please contact our sales team for custom pricing on bulk purchases.",
    },
    {
      question: "How can I become a vendor?",
      answer:
        "We are always looking for quality agricultural product suppliers. Please fill out our vendor application form or contact our partnership team.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, UPI, Net Banking, and digital wallets. Cash on Delivery is also available for eligible orders.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Support</h1>
          <p className="text-xl text-gray-600">We're here to help you with any questions or concerns</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white shadow-md text-center">
            <CardContent className="p-6">
              <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-700 mb-2">+1 (555) 123-4567</p>
              <p className="text-gray-600 text-sm">Mon-Fri: 9AM-5PM IST</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md text-center">
            <CardContent className="p-6">
              <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">Email Support</h3>
              <p className="text-gray-700 mb-2">support@agrimart.com</p>
              <p className="text-gray-600 text-sm">Response within 24 hours</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md text-center">
            <CardContent className="p-6">
              <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-700 mb-2">Available 24/7</p>
              <Button className="bg-green-600 hover:bg-green-700 mt-2">Start Chat</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-gray-900">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={supportForm.name}
                      onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={supportForm.email}
                      onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={supportForm.category}
                    onValueChange={(value) => setSupportForm({ ...supportForm, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order">Order Issues</SelectItem>
                      <SelectItem value="product">Product Questions</SelectItem>
                      <SelectItem value="shipping">Shipping & Delivery</SelectItem>
                      <SelectItem value="account">Account Support</SelectItem>
                      <SelectItem value="technical">Technical Issues</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={supportForm.subject}
                    onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={supportForm.message}
                    onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-gray-900">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-gray-800 hover:text-green-600">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
