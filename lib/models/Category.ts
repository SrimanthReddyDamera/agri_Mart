import mongoose, { Schema, models } from "mongoose"
import type { Category as CategoryType } from "@/types"

const categorySchema = new Schema<CategoryType>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true },
)

const Category = models.Category || mongoose.model<CategoryType>("Category", categorySchema)

export default Category
