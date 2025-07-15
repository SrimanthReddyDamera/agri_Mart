import { Skeleton } from "@/components/ui/skeleton"

export default function OrderSuccessLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="w-full max-w-2xl bg-white shadow-lg text-center p-8 rounded-lg">
        <div className="space-y-6">
          <Skeleton className="w-24 h-24 mx-auto rounded-full" />
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <Skeleton className="h-5 w-1/3 mx-auto" />

          <div className="border-t border-b border-gray-200 py-4 my-6 space-y-4">
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <div className="space-y-2 text-left max-w-sm mx-auto">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-6 w-full mt-2" />
            </div>
          </div>

          <Skeleton className="h-5 w-2/3 mx-auto" />

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    </div>
  )
}
