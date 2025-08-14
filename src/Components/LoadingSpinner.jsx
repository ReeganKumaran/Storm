import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-blue-300 rounded-full animate-spin-slow"></div>
      </div>
      <p className="mt-4 text-slate-400 animate-pulse">Loading weather data...</p>
    </div>
  );
}

export default LoadingSpinner;