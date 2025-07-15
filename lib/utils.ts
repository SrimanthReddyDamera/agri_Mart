import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(price)
}

export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  if (originalPrice <= 0 || currentPrice >= originalPrice) {
    return 0
  }
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-500"
    case "processing":
      return "bg-blue-500"
    case "shipped":
      return "bg-purple-500"
    case "delivered":
      return "bg-green-500"
    case "cancelled":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}
