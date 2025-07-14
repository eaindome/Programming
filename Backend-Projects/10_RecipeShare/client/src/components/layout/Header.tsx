import { ChefHat } from "lucide-react";
import React from "react";

export function Header() {
  return (
    <header className="p-4 flex justify-between items-center bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <ChefHat className="text-green" size={32} />
        <h1 className="text-2xl font-bold text-blue-200">RecipeShare</h1>
      </div>
      <div className="flex gap-4">
        <button className="px-4 py-2 rounded-lg font-medium bg-blue-100 text-white transition-opacity hover:opacity-90">
          Sign In
        </button>
        <button className="px-4 py-2 rounded-lg font-medium bg-orange-100 text-white transition-opacity hover:opacity-90">
          Share Recipe
        </button>
      </div>
    </header>
  );
}