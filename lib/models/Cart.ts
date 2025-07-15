import mongoose, { Schema, models } from "mongoose"

export interface CartItem {
  productId: Schema.Types.ObjectId
  name: string
  price: number
  quantity: number
  image?: string
  sku?: string
  stock: number
}

export interface Cart {
  _id?: mongoose.Types.ObjectId
  userId: Schema.Types.ObjectId
  items: CartItem[]
  updatedAt: Date
  createdAt: Date
}

const cartItemSchema = new Schema<CartItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String },
    sku: { type: String },
    stock: { type: Number, required: true },
  },
  { _id: false }
)

const cartSchema = new Schema<Cart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [cartItemSchema],
  },
  { timestamps: true }
)

const Cart = models.Cart || mongoose.model<Cart>("Cart", cartSchema)

export default Cart