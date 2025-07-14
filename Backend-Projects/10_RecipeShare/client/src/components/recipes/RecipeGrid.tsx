import React from "react";
import { Recipe } from "../../types";
import { RecipeCard } from "./RecipeCard";
import { Loader } from "lucide-react";

interface RecipeGridProps {
  recipes: Recipe[];
  title: string;
  isLoading?: boolean;
  error?: Error;
}

export function RecipeGrid({ recipes, title, isLoading, error }: RecipeGridProps) {
    if (error) {
      return (
        <div className="text-center py-8">
          <p className="text-red-500">Error loading recipes: {error.message}</p>
        </div>
      );
    }
  
    return (
      <div className="px-8 py-12">
        <h3 className="text-2xl font-bold mb-6 text-blue-200">{title}</h3>
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="animate-spin text-blue-100" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    );
}