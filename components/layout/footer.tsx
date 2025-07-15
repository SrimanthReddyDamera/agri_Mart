import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 md:py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">AgriMart</h3>
          <p className="text-sm leading-relaxed">
            Your trusted partner for premium agricultural products and sustainable farming solutions. We empower farmers
            worldwide.
          </p>
          <div className="flex space-x-4 mt-6">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white transition-colors text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition-colors text-sm">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors text-sm">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors text-sm">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/orders" className="hover:text-white transition-colors text-sm">
                My Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/support" className="hover:text-white transition-colors text-sm">
                Support Center
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-white transition-colors text-sm">
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-white transition-colors text-sm">
                Shipping Information
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors text-sm">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Contact Info</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm">
              <MapPin className="h-5 w-5 text-green-500" />
              <span>123 Farm Lane, AgriCity, AG 12345</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Phone className="h-5 w-5 text-green-500" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Mail className="h-5 w-5 text-green-500" />
              <span>info@agrimart.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AgriMart. All rights reserved.
      </div>
    </footer>
  )
}
