import mongoose, { type Document, Schema } from "mongoose"

export interface IOrderTracking extends Document {
  orderId: mongoose.Types.ObjectId
  status: string
  location: string
  description: string
  timestamp: Date
  updatedBy: mongoose.Types.ObjectId
}

const OrderTrackingSchema = new Schema<IOrderTracking>({
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  status: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
})

export default mongoose.models.OrderTracking || mongoose.model<IOrderTracking>("OrderTracking", OrderTrackingSchema)
