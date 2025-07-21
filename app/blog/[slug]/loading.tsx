// app/blog/[slug]/loading.tsx
export default function BlogDetailLoading() {
  return (
    <div className="max-w-3xl mx-auto p-6 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
      <div className="h-64 bg-gray-300 rounded mb-6"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}
