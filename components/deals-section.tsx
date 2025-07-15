import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export default function DealsSection() {
  return (
    <section className="py-12 md:py-16 bg-green-700 text-white">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1587495588041-511149191113?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Limited Time Deal"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Clock className="w-12 h-12 mx-auto text-white" />
              <h3 className="text-3xl font-bold">Limited Time Offer!</h3>
              <p className="text-lg">Don't miss out on our exclusive deals.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6 text-center lg:text-left">
          <h2 className="text-4xl font-bold leading-tight">Unlock Special Savings on Premium Products</h2>
          <p className="text-lg text-green-100">
            Explore our daily deals and get the best prices on seeds, fertilizers, and farm equipment.
          </p>
          <Button asChild className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 text-lg">
            <Link href="/products?deal=true">View All Deals</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
