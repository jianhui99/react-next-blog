export default function BlogDetailLoading() {
  return (
    <div className="max-w-3xl mx-auto p-6 animate-pulse">
      {/* Title */}
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-3"></div>
      
      {/* Cover image */}
      <div className="h-64 bg-gray-300 rounded mb-6"></div>

      {/* Author & meta */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-100 rounded w-1/4"></div>
        </div>
      </div>

      {/* Content paragraphs */}
      <div className="space-y-4 mb-10">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-11/12"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Category */}
      <div className="h-5 bg-gray-200 rounded w-24 mb-6"></div>

      {/* Related Posts skeleton */}
      <div className="space-y-3">
        <div className="h-5 bg-gray-300 rounded w-40"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="h-40 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
