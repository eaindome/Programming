import React from "react";
import { Recipe } from "../../types";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="rounded-lg p-4 bg-white shadow-md transition-transform hover:scale-105">
      <div className="w-full h-48 mb-4 rounded-lg bg-gray-200 overflow-hidden">
        <img
          src="/api/placeholder/400/320"
          alt={recipe.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h4 className="text-xl font-bold mb-2 text-blue-200">{recipe.title}</h4>
      <p className="text-blue-300">By {recipe.chef}</p>
      <div className="flex justify-between mt-4">
        <span className="px-2 py-1 rounded-full text-sm bg-white text-blue-300">
          {recipe.time}
        </span>
        <span className="px-2 py-1 rounded-full text-sm bg-green text-white">
          {recipe.difficulty}
        </span>
      </div>
    </div>
  );
}