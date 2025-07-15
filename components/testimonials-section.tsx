import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "AgriMart has transformed my farming business. The quality of products is unmatched, and their support is excellent!",
      author: "Rajesh Kumar",
      farm: "Green Valley Farms",
    },
    {
      quote:
        "Reliable products and timely delivery. AgriMart is my go-to for all agricultural needs. Highly recommended!",
      author: "Priya Sharma",
      farm: "Sunrise Orchards",
    },
    {
      quote: "The best place to buy farm equipment. Their smart irrigation system saved me so much water and effort.",
      author: "Amit Patel",
      farm: "Golden Harvest Fields",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">What Our Farmers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-md">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-green-600 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-4">"{testimonial.quote}"</p>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-600">{testimonial.farm}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
