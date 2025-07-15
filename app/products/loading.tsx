import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Products</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar Skeleton */}
        <aside className="w-full lg:w-1/4 p-6 bg-white rounded-lg shadow-md">
          <Skeleton className="h-8 w-3/4 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </aside>

        {/* Product Grid Skeleton */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-10 w-1/4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
