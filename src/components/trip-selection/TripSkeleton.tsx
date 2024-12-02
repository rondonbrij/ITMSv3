export function TripSkeleton({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <tr className="animate-pulse">
      <td className="p-2">
        <div className="h-6 bg-gray-200 rounded"></div>
      </td>
      <td className="p-2">
        <div className="h-6 bg-gray-200 rounded"></div>
      </td>
      <td className="p-2">
        <div className="h-6 bg-gray-200 rounded"></div>
      </td>
      <td className="p-2">
        <div className="h-6 bg-gray-200 rounded"></div>
      </td>
      <td className="p-2">
        <div className="h-6 bg-gray-200 rounded"></div>
      </td>
      <td className="p-2">
        <div className="h-10 bg-gray-200 rounded w-24 ml-auto"></div>
      </td>
    </tr>
  );
}
