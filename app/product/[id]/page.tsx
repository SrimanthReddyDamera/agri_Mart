import { ProductDetails } from "@/components/product-details"
import { ProductReviews } from "@/components/product-reviews"
import { SimilarProducts } from "@/components/similar-products"

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-800">
      <div className="container mx-auto px-4 py-8">
        <ProductDetails productId={params.id} />
        <div className="mt-12">
          <ProductReviews productId={params.id} />
        </div>
        <div className="mt-12">
          <SimilarProducts productId={params.id} />
        </div>
      </div>
    </div>
  )
}
