"use client"

import type React from "react"
import { useState } from "react"

export default function SupportPage() {
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Support request:", supportForm)
    setSupportForm({
      name: "",
      email: "",
      category: "",
      subject: "",
      message: "",
    })
    alert("Support request submitted successfully!")
  }

  const faqs = [
    {
      question: "How do I track my order?",
      answer: 'You can track your order by logging into your account and visiting the "My Orders" section.',
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most products. Items must be in original condition.",
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes, we offer bulk discounts for large orders. Please contact our sales team.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept UPI, cards, net banking, digital wallets, and cash on delivery.",
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Customer Support</h1>
          <p className="text-xl text-gray-300">We're here to help you with any questions or concerns</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-black/70 border border-red-400/30 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-white font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-400 mb-1">+91 98765 43210</p>
            <p className="text-gray-400 mb-1 text-sm">+91 87654 32109 (Toll Free)</p>
            <p className="text-gray-400 text-sm">Mon-Sat: 9AM-7PM IST</p>
            <p className="text-gray-400 text-sm">Sunday: 10AM-5PM IST</p>
          </div>

          <div className="bg-black/70 border border-red-400/30 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">✉️</div>
            <h3 className="text-white font-semibold mb-2">Email Support</h3>
            <p className="text-gray-400 mb-1">support@agrimart.com</p>
            <p className="text-gray-400 mb-1 text-sm">sales@agrimart.com</p>
            <p className="text-gray-400 text-sm">Response within 24 hours</p>
          </div>

          <div className="bg-black/70 border border-red-400/30 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-white font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-400 mb-2">Available 24/7</p>
            <p className="text-gray-400 text-sm mb-2">WhatsApp: +91 98765 43210</p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-2">Start Chat</button>
          </div>

          <div className="bg-black/70 border border-red-400/30 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-white font-semibold mb-2">Visit Our Office</h3>
            <p className="text-gray-400 mb-1 text-sm">AgriMart Head Office</p>
            <p className="text-gray-400 mb-1 text-sm">Sector 15, Gurugram</p>
            <p className="text-gray-400 mb-2 text-sm">Haryana - 122001</p>
            <a
              href="https://maps.google.com/?q=AgriMart+Gurugram+Haryana"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
            >
              📍 Google Maps
            </a>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Our Office Locations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-black/70 border border-red-400/30 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">🏢 Head Office - Gurugram</h3>
              <div className="text-gray-400 space-y-1 text-sm">
                <p>123 Agriculture Complex</p>
                <p>Sector 15, Gurugram</p>
                <p>Haryana - 122001</p>
                <p>📞 +91 98765 43210</p>
                <a
                  href="https://maps.google.com/?q=Sector+15+Gurugram+Haryana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:underline inline-block mt-2"
                >
                  📍 View on Google Maps
                </a>
              </div>
            </div>

            <div className="bg-black/70 border border-red-400/30 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">🌾 Regional Office - Punjab</h3>
              <div className="text-gray-400 space-y-1 text-sm">
                <p>456 Krishi Bhawan</p>
                <p>Model Town, Ludhiana</p>
                <p>Punjab - 141002</p>
                <p>📞 +91 87654 32109</p>
                <a
                  href="https://maps.google.com/?q=Model+Town+Ludhiana+Punjab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:underline inline-block mt-2"
                >
                  📍 View on Google Maps
                </a>
              </div>
            </div>

            <div className="bg-black/70 border border-red-400/30 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">🚜 Warehouse - Maharashtra</h3>
              <div className="text-gray-400 space-y-1 text-sm">
                <p>789 Industrial Area</p>
                <p>MIDC, Aurangabad</p>
                <p>Maharashtra - 431001</p>
                <p>📞 +91 76543 21098</p>
                <a
                  href="https://maps.google.com/?q=MIDC+Aurangabad+Maharashtra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:underline inline-block mt-2"
                >
                  📍 View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-black/70 border border-red-400/30 rounded-lg p-6">
            <h2 className="text-white text-xl font-semibold mb-4">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Name</label>
                  <input
                    type="text"
                    value={supportForm.name}
                    onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-red-400/50 text-white rounded focus:outline-none focus:border-red-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    value={supportForm.email}
                    onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-red-400/50 text-white rounded focus:outline-none focus:border-red-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">Category</label>
                <select
                  value={supportForm.category}
                  onChange={(e) => setSupportForm({ ...supportForm, category: e.target.value })}
                  className="w-full px-3 py-2 bg-black/50 border border-red-400/50 text-white rounded focus:outline-none focus:border-red-400"
                >
                  <option value="">Select a category</option>
                  <option value="order">Order Issues</option>
                  <option value="product">Product Questions</option>
                  <option value="shipping">Shipping & Delivery</option>
                  <option value="account">Account Support</option>
                  <option value="technical">Technical Issues</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2">Subject</label>
                <input
                  type="text"
                  value={supportForm.subject}
                  onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-black/50 border border-red-400/50 text-white rounded focus:outline-none focus:border-red-400"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Message</label>
                <textarea
                  value={supportForm.message}
                  onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                  className="w-full px-3 py-2 bg-black/50 border border-red-400/50 text-white rounded focus:outline-none focus:border-red-400"
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="bg-black/70 border border-red-400/30 rounded-lg p-6">
            <h2 className="text-white text-xl font-semibold mb-4">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                  <p className="text-gray-300 text-sm">{faq.answer}</p>
                  {index < faqs.length - 1 && <hr className="border-red-400/30 mt-4" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
