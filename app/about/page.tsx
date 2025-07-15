import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, Award, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About AgriMart</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering farmers worldwide with premium agricultural products and innovative solutions for sustainable
            farming practices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white shadow-md text-center">
            <CardContent className="p-6">
              <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">Sustainable</h3>
              <p className="text-gray-600 text-sm">Eco-friendly products for sustainable agriculture</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md text-center">
            <CardContent className="p-6">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">Community</h3>
              <p className="text-gray-600 text-sm">Supporting farming communities globally</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md text-center">
            <CardContent className="p-6">
              <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">Premium quality products with guaranteed results</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md text-center">
            <CardContent className="p-6">
              <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">Global Reach</h3>
              <p className="text-gray-600 text-sm">Serving farmers across continents</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-white shadow-md">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At AgriMart, we are dedicated to revolutionizing agriculture by providing farmers with access to the
                highest quality seeds, tools, and equipment. Our mission is to enhance agricultural productivity while
                promoting sustainable farming practices.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe that by empowering farmers with the right resources and knowledge, we can contribute to
                global food security and environmental sustainability.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded in 2020 by a team of agricultural experts and technology enthusiasts, AgriMart was born from the
                vision of bridging the gap between traditional farming and modern agricultural innovations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we serve thousands of farmers worldwide, offering everything from premium seeds to cutting-edge
                farming equipment, all backed by our commitment to quality and customer satisfaction.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
