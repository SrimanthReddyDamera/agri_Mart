import type React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppProvider } from "./contexts/AppContext"
import { Header } from "./components/layout/Header"
import { Footer } from "./components/layout/Footer"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import WishlistPage from "./pages/WishlistPage"
import OrdersPage from "./pages/OrdersPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import PaymentPage from "./pages/PaymentPage"
import SuccessPage from "./pages/SuccessPage"
import ProductPage from "./pages/ProductPage"
import AboutPage from "./pages/AboutPage"
import SupportPage from "./pages/SupportPage"
import AdminPage from "./pages/AdminPage"
import "./App.css"

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-800">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/checkout/payment" element={<PaymentPage />} />
              <Route path="/checkout/success" element={<SuccessPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
