import React from "react";
import { AlertTriangle } from "lucide-react";

function ErrorMessage({ message }) {
  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="bg-red-500/10 backdrop-blur-sm border-2 border-red-500/30 rounded-xl p-6">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="text-red-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-red-400 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-slate-300">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;