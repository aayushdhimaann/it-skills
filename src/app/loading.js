import React from "react";
// import { Loader } from "lucide-react"; // Importing the Loader icon from lucide-react
import { Skeleton } from "@/components/ui/skeleton";
const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md">
      {/* Full screen overlay with slight blur */}
      <div className="flex flex-col items-center justify-center">
        {/* <Loader className="animate-spin text-gray-600" size={48} /> */}
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        {/* Lucide Loader Icon with spin animation */}
        <p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
