"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, User } from "lucide-react"

const mockReviews = [
  {
    id: 1,
    user: "John Farmer",
    rating: 5,
    date: "2024-01-15",
    comment: "Excellent quality seeds! Got amazing yield this season. Highly recommended for commercial farming.",
  },
  {
    id: 2,
    user: "Sarah Green",
    rating: 4,
    date: "2024-01-10",
    comment: "Good quality seeds with high germination rate. Delivery was quick and packaging was perfect.",
  },
  {
    id: 3,
    user: "Mike Agriculture",
    rating: 5,
    date: "2024-01-05",
    comment: "Best wheat seeds I have used. Disease resistance is excellent and yield exceeded expectations.",
  },
]

interface ProductReviewsProps {
  productId: string
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(5)

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, submit to backend
    console.log("Submitting review:", { rating: newRating, comment: newReview })
    setNewReview("")
    setNewRating(5)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>

      {/* Add Review Form */}
      <Card className="bg-black/50 border-red-400/30">
        <CardHeader>
          <CardTitle className="text-white">Write a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="text-white mb-2 block">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setNewRating(star)} className="text-2xl">
                    <Star
                      className={`w-6 h-6 ${star <= newRating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-white mb-2 block">Your Review</label>
              <Textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Share your experience with this product..."
                className="bg-black/50 border-red-400/50 text-white"
                rows={4}
              />
            </div>

            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Submit Review
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {mockReviews.map((review) => (
          <Card key={review.id} className="bg-black/50 border-red-400/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white font-semibold">{review.user}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">{review.date}</span>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProductReviews
