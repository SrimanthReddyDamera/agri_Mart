import ProductCard from "@/components/product-card"
import ProductFilters from "@/components/product-filters"
import ProductSort from "@/components/product-sort"
import type { Product } from "@/types"

interface ProductsPageProps {
  searchParams: {
    search?: string
    category?: string
    minPrice?: string
    maxPrice?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }
}

async function getProducts(params: ProductsPageProps["searchParams"]): Promise<Product[]> {
  // In a real application, this would fetch from your API
  // For now, return mock data based on filters
  const allProducts: Product[] = [
    {
      _id: "65f7d8e2a7b8c9d0e1f2a3b4",
      name: "Organic Wheat Seeds (High Yield)",
      description:
        "Premium quality organic wheat seeds, ideal for high yield and disease resistance. Suitable for all climates.",
      price: 1200,
      originalPrice: 1500,
      image:
        "https://images.unsplash.com/photo-1587495588041-511149191113?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "https://images.unsplash.com/photo-1587495588041-511149191113?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://source.unsplash.com/random/300x200?wheat-seeds-2",
        "https://source.unsplash.com/random/300x200?wheat-seeds-3",
      ],
      category: { _id: "cat1", name: "Seeds & Fertilizers", slug: "seeds-fertilizers" },
      stock: 150,
      sku: "WHT-001",
      rating: 4.8,
      reviews: 120,
      isFeatured: true,
      isLimitedDeal: false,
      specifications: new Map([
        ["Weight", "10 kg"],
        ["Germination Rate", "95%"],
        ["Harvest Time", "120 days"],
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "65f7d8e2a7b8c9d0e1f2a3b6",
      name: "Smart Irrigation System (Automated)",
      description: "Automated irrigation system with smart sensors for optimal water usage. Saves water and labor.",
      price: 25000,
      originalPrice: 28000,
      image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8dce0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "https://images.unsplash.com/photo-1586773860418-d37222d8dce0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://source.unsplash.com/random/300x200?irrigation-system-2",
        "https://source.unsplash.com/random/300x200?irrigation-system-3",
      ],
      category: { _id: "cat2", name: "Farm Equipment", slug: "farm-equipment" },
      stock: 30,
      sku: "IRR-005",
      rating: 4.5,
      reviews: 85,
      isFeatured: true,
      isLimitedDeal: true,
      specifications: new Map([
        ["Coverage Area", "2 acres"],
        ["Power Source", "Solar/Electric"],
        ["Control", "Mobile App"],
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "65f7d8e2a7b8c9d0e1f2a3b8",
      name: "Bio-Organic Fertilizer (50kg)",
      description: "Environmentally friendly fertilizer, enhances soil fertility and crop growth naturally.",
      price: 800,
      originalPrice: 950,
      image:
        "https://images.unsplash.com/photo-1587495588041-511149191113?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "https://images.unsplash.com/photo-1587495588041-511149191113?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://source.unsplash.com/random/300x200?fertilizer-2",
        "https://source.unsplash.com/random/300x200?fertilizer-3",
      ],
      category: { _id: "cat1", name: "Seeds & Fertilizers", slug: "seeds-fertilizers" },
      stock: 200,
      sku: "FERT-003",
      rating: 4.7,
      reviews: 90,
      isFeatured: true,
      isLimitedDeal: false,
      specifications: new Map([
        ["Weight", "50 kg"],
        ["Composition", "Organic Matter"],
        ["Application", "All Crops"],
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "65f7d8e2a7b8c9d0e1f2a3b9",
      name: "Mini Tractor (Compact Model)",
      description: "Compact and efficient mini tractor, perfect for small to medium-sized farms. Easy to operate.",
      price: 150000,
      originalPrice: 165000,
      image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8dce0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      images: [
        "https://images.unsplash.com/photo-1586773860418-d37222d8dce0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB4MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://source.unsplash.com/random/300x200?mini-tractor-2",
        "https://source.unsplash.com/random/300x200?mini-tractor-3",
      ],
      category: { _id: "cat2", name: "Farm Equipment", slug: "farm-equipment" },
      stock: 10,
      sku: "TRC-002",
      rating: 4.6,
      reviews: 55,
      isFeatured: true,
      isLimitedDeal: true,
      specifications: new Map([
        ["Engine Power", "25 HP"],
        ["Fuel Type", "Diesel"],
        ["Weight", "1200 kg"],
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "65f7d8e2a7b8c9d0e1f2a3c0",
      name: "Organic Pesticide (Neem Oil)",
      description: "Natural and effective pesticide derived from neem oil. Safe for crops and environment.",
      price: 500,
      originalPrice: 600,
      image: "https://source.unsplash.com/random/300x200?pesticide",
      images: [
        "https://source.unsplash.com/random/300x200?pesticide",
        "https://source.unsplash.com/random/300x200?neem-oil-2",
      ],
      category: { _id: "cat3", name: "Pesticides & Crop Care", slug: "pesticides-crop-care" },
      stock: 80,
      sku: "PEST-001",
      rating: 4.4,
      reviews: 70,
      isFeatured: false,
      isLimitedDeal: false,
      specifications: new Map([
        ["Volume", "1 Liter"],
        ["Application", "Foliar Spray"],
        ["Ingredients", "Neem Extract"],
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "65f7d8e2a7b8c9d0e1f2a3c1",
      name: "Drip Irrigation Kit (Small Farm)",
      description: "Complete drip irrigation kit for small farms and gardens. Easy to install and highly efficient.",
      price: 7500,
      originalPrice: 8500,
      image: "https://source.unsplash.com/random/300x200?drip-irrigation",
      images: [
        "https://source.unsplash.com/random/300x200?drip-irrigation",
        "https://source.unsplash.com/random/300x200?drip-irrigation-kit-2",
      ],
      category: { _id: "cat4", name: "Irrigation Systems", slug: "irrigation-systems" },
      stock: 45,
      sku: "DRIP-001",
      rating: 4.3,
      reviews: 60,
      isFeatured: false,
      isLimitedDeal: true,
      specifications: new Map([
        ["Coverage", "0.5 acre"],
        ["Pipe Length", "100m"],
        ["Dripper Spacing", "30cm"],
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "65f7d8e2a7b8c9d0e1f2a3c2",
      name: "Hybrid Corn Seeds (Disease Resistant)",
      description: "High-quality hybrid corn seeds with excellent disease resistance and robust growth.",
      price: 900,
      originalPrice: 1000,
      image: "https://source.unsplash.com/random/300x200?corn-seeds",
      images: [
        "https://source.unsplash.com/random/300x200?corn-seeds",
        "https://source.unsplash.com/random/300x200?hybrid-corn-2",
      ],
      category: { _id: "cat1", name: "Seeds & Fertilizers", slug: "seeds-fertilizers" },
      stock: 180,
      sku: "CRN-002",
      rating: 4.6,
      reviews: 110,
      isFeatured: false,
      isLimitedDeal: false,
      specifications: new Map([
        ["Weight", "5 kg"],
        ["Germination Rate", "92%"],
        ["Maturity", "90 days"],
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "65f7d8e2a7b8c9d0e1f2a3c3",
      name: "Power Tiller (Electric)",
      description: "Electric power tiller for efficient soil preparation. Low noise and eco-friendly.",
      price: 35000,
      originalPrice: 38000,
      image: "https://source.unsplash.com/random/300x200?power-tiller",
      images: [
        "https://source.unsplash.com/random/300x200?power-tiller",
        "https://source.unsplash.com/random/300x200?electric-tiller-2",
      ],
      category: { _id: "cat2", name: "Farm Equipment", slug: "farm-equipment" },
      stock: 20,
      sku: "TILL-001",
      rating: 4.2,
      reviews: 40,
      isFeatured: false,
      isLimitedDeal: false,
      specifications: new Map([
        ["Motor Power", "5 HP"],
        ["Working Width", "60 cm"],
        ["Weight", "80 kg"],
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  let filteredProducts = allProducts

  // Apply search filter
  if (params.search) {
    const searchTerm = params.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        (typeof p.category === "object" && p.category.name.toLowerCase().includes(searchTerm)),
    )
  }

  // Apply category filter
  if (params.category) {
    filteredProducts = filteredProducts.filter((p) =>
      typeof p.category === "object" ? p.category.slug === params.category : p.category === params.category,
    )
  }

  // Apply price filters
  if (params.minPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price >= Number(params.minPrice))
  }
  if (params.maxPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price <= Number(params.maxPrice))
  }

  // Apply sorting
  if (params.sortBy) {
    filteredProducts.sort((a, b) => {
      let valA: any, valB: any

      switch (params.sortBy) {
        case "price":
          valA = a.price
          valB = b.price
          break
        case "rating":
          valA = a.rating
          valB = b.rating
          break
        case "name":
          valA = a.name.toLowerCase()
          valB = b.name.toLowerCase()
          break
        case "reviews":
          valA = a.reviews
          valB = b.reviews
          break
        default:
          return 0
      }

      if (valA < valB) return params.sortOrder === "asc" ? -1 : 1
      if (valA > valB) return params.sortOrder === "asc" ? 1 : -1
      return 0
    })
  }

  return filteredProducts
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const products = await getProducts(searchParams)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Products</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-1/4 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Filters</h2>
          <ProductFilters />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-700">Showing {products.length} results</p>
            <ProductSort />
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id.toString()} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
