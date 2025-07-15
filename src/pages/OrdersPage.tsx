import { Link } from "react-router-dom"
import { useApp } from "../contexts/AppContext"

export default function OrdersPage() {
  const { state } = useApp()

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-yellow-600"
      case "shipped":
        return "bg-blue-600"
      case "delivered":
        return "bg-green-600"
      case "cancelled":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  if (!state.user) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="text-6xl mb-6">📦</div>
            <h1 className="text-3xl font-bold text-white mb-4">Please Login</h1>
            <p className="text-gray-400 mb-8">You need to login to view your orders</p>
            <Link to="/auth/login">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (state.orders.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="text-6xl mb-6">📦</div>
            <h1 className="text-3xl font-bold text-white mb-4">No Orders Yet</h1>
            <p className="text-gray-400 mb-8">You haven't placed any orders yet. Start shopping!</p>
            <Link to="/">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold">
                ← Start Shopping
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
          <h1 className="text-3xl font-bold text-white">My Orders</h1>
          <p className="text-gray-400">{state.orders.length} orders found</p>
        </div>

        <div className="space-y-6">
          {state.orders.map((order) => (
            <div key={order.id} className="bg-black/70 border border-red-400/30 rounded-lg">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white text-xl font-semibold flex items-center gap-2">📦 Order #{order.id}</h3>
                    <p className="text-gray-400">Placed on {order.date}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`${getStatusColor(order.status)} text-white text-sm px-3 py-1 rounded-full mb-2 inline-block`}
                    >
                      {order.status}
                    </span>
                    <p className="text-white font-bold text-lg">₹{order.total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-black/30 rounded-lg">
                      <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">📦</div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{item.name}</h4>
                        <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">₹{item.price.toLocaleString()} each</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-red-400/30">
                  <div className="text-gray-400">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </div>
                  <button className="border border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-4 py-2 rounded">
                    👁️ View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
