"use client"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../contexts/AppContext"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartItemsCount } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (cart.length === 0) return
    navigate("/checkout/payment")
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">Add some products to your cart to get started!</p>
            <Link to="/">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold">
                ← Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-red-400 hover:text-red-300 mb-4">
            ← Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
          <p className="text-gray-400">{cartItemsCount} items in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-black/70 border border-red-400/30 rounded-lg p-6">
                <div className="flex gap-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-white font-semibold text-lg hover:text-red-400 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                    <p className="text-red-400 font-bold text-xl">₹{item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-red-400 text-red-400 hover:bg-red-400 hover:text-white rounded"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="w-16 text-center bg-black/50 border border-red-400/50 text-white rounded"
                        min="1"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-red-400 text-red-400 hover:bg-red-400 hover:text-white rounded"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-3 py-1 border border-red-400 text-red-400 hover:bg-red-400 hover:text-white rounded text-sm"
                    >
                      🗑️ Remove
                    </button>

                    {/* Item Total */}
                    <p className="text-white font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="px-4 py-2 border border-red-400 text-red-400 hover:bg-red-400 hover:text-white rounded"
              >
                🗑️ Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-black/70 border border-red-400/30 rounded-lg p-6 sticky top-24">
              <h2 className="text-white text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({cartItemsCount} items)</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>GST (18%)</span>
                  <span>₹{(cartTotal * 0.18).toLocaleString()}</span>
                </div>

                <hr className="border-red-400/30" />

                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>₹{(cartTotal * 1.18).toLocaleString()}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-3 rounded-lg font-semibold"
                >
                  Proceed to Payment
                </button>

                <p className="text-gray-400 text-sm text-center">Free shipping on all orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
