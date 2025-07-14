import { ArrowRight } from "lucide-react";
import React from "react";

interface ViewMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function ViewMoreButton({ onClick, isLoading }: ViewMoreButtonProps) {
  return (
    <div className="text-center mt-8">
      <button
        onClick={onClick}
        className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto 
                 bg-orange-100 text-white transition-opacity hover:opacity-90"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "View More Recipes"}
        {!isLoading && <ArrowRight size={20} />}
      </button>
    </div>
  );
}