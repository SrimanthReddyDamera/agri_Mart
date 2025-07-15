import mongoose, { Schema, models } from "mongoose"
import type { Review as ReviewType } from "@/types"

const reviewSchema = new Schema<ReviewType>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const Review = models.Review || mongoose.model<ReviewType>("Review", reviewSchema)

export default Review
