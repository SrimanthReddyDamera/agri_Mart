export function HeroSection() {
  return (
    <section className="relative py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center gap-4 mb-6">
          <span className="text-6xl">🚜</span>
          <h1 className="text-5xl font-bold text-white">AgriMart</h1>
          <span className="text-6xl">🌱</span>
        </div>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Your one-stop destination for premium agricultural products, tools, and equipment. Empowering farmers with
          quality solutions for better harvests.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors">
            Shop Now →
          </button>
          <button className="px-8 py-3 border border-red-400 text-red-400 hover:bg-red-400 hover:text-white rounded-lg font-semibold transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
