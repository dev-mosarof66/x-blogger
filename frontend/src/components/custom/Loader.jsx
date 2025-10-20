export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-900">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Optional loading text */}
      <p className="mt-4 text-gray-600 dark:text-gray-200 text-sm font-medium">
        Loading, please wait...
      </p>
    </div>
  );
}
