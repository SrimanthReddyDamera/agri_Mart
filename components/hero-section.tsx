import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1534972198883-f174792717d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Agricultural landscape"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-4">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Cultivating Success, Delivering Quality
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Your trusted partner for premium agricultural products and sustainable farming solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-lg bg-transparent"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
