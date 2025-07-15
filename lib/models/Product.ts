import mongoose, { Schema, models } from "mongoose"
import type { Product as ProductType } from "@/types"

const productSchema = new Schema<ProductType>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, default: 0 },
    image: { type: String, required: true },
    images: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String, unique: true, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isLimitedDeal: { type: Boolean, default: false },
    specifications: { type: Map, of: String }, // Flexible key-value pairs for specs
  },
  { timestamps: true },
)

const Product = models.Product || mongoose.model<ProductType>("Product", productSchema)

export default Product
