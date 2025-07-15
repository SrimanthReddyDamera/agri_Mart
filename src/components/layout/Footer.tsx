import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-black border-t border-red-400/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <span className="text-red-400">🚜</span>
              AgriMart
            </div>
            <p className="text-gray-400 mb-4">
              Empowering farmers worldwide with premium agricultural products and innovative solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                🐦
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                📷
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-red-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-red-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-red-400 transition-colors">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="text-gray-400 hover:text-red-400 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/?category=seeds" className="text-gray-400 hover:text-red-400 transition-colors">
                  Seeds & Saplings
                </Link>
              </li>
              <li>
                <Link to="/?category=fertilizers" className="text-gray-400 hover:text-red-400 transition-colors">
                  Fertilizers
                </Link>
              </li>
              <li>
                <Link to="/?category=tools" className="text-gray-400 hover:text-red-400 transition-colors">
                  Farm Tools
                </Link>
              </li>
              <li>
                <Link to="/?category=equipment" className="text-gray-400 hover:text-red-400 transition-colors">
                  Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <span>📞</span>
                <div>
                  <div>+91 98765 43210</div>
                  <div className="text-sm">+91 87654 32109 (Toll Free)</div>
                </div>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>✉️</span>
                <div>
                  <div>support@agrimart.com</div>
                  <div className="text-sm">sales@agrimart.com</div>
                </div>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>⏰</span>
                <div>
                  <div>Mon-Sat: 9:00 AM - 7:00 PM</div>
                  <div className="text-sm">Sunday: 10:00 AM - 5:00 PM</div>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <span>📍</span>
                <div>
                  <div>AgriMart Head Office</div>
                  <div>123 Agriculture Complex,</div>
                  <div>Sector 15, Gurugram,</div>
                  <div>Haryana - 122001, India</div>
                  <a
                    href="https://maps.google.com/?q=AgriMart+Gurugram+Haryana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:underline text-sm mt-1 inline-block"
                  >
                    📍 View on Google Maps
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span>🌐</span>
                <div>
                  <div>www.agrimart.com</div>
                  <div className="text-sm">ISO 9001:2015 Certified</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-400/30 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 AgriMart. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}
