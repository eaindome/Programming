import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { Header } from "../components/layout/Header";
import { HeroSection } from "../components/hero/HeroSection";
import { SearchBar } from "../components/search/SearchBar";
import { RecipeGrid } from "../components/recipes/RecipeGrid";
import { ViewMoreButton } from "../components/common/ViewMoreButton";
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { fetchRecipes } from "../lib/api";
import type { Recipe } from "../types";
import React from "react";


const featuredRecipes: Recipe[] = [
  { 
    id: 1, 
    title: 'Classic Tiramisu', 
    chef: 'Maria Romano', 
    time: '45 mins', 
    difficulty: 'Medium',
    ingredients: ['Pepper']
  },
  { 
    id: 2, 
    title: 'Vegetable Curry', 
    chef: 'Priya Shah', 
    time: '30 mins', 
    difficulty: 'Easy',
    ingredients: ['Tomato']
  },
  { 
    id: 3, 
    title: 'French Toast', 
    chef: 'Jean Martin', 
    time: '20 mins', 
    difficulty: 'Easy',
    ingredients: ['Eggs']
  }
];

export default function Home() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [page, setPage] = useState(1);

    const { 
        data, 
        isLoading, 
        error
    } = useQuery({
        queryKey: ['recipes', page, searchQuery],
        queryFn: () => fetchRecipes(page, searchQuery),
        staleTime: 5000
    });
  
    const handleViewMore = () => {
      setPage(prev => prev + 1);
    };
  
    return (
        <div className="min-h-screen bg-white">
            <ErrorBoundary>
                <Header />
                <HeroSection
                    title="Discover & Share Amazing Recipes"
                    description="Join our community of passionate chefs and food lovers. Find inspiration for your next meal or share your culinary creations with the world."
                />
                <SearchBar 
                    searchQuery={searchQuery} 
                    onSearchChange={(value) => {
                        setSearchQuery(value);
                        setPage(1);
                    }} 
                />
                <RecipeGrid 
                    recipes={data?.recipes ?? []} 
                    title="Featured Recipes"
                    isLoading={isLoading}
                    error={error as Error}
                />
                {data?.recipes && data.recipes.length < data.total && (
                    <ViewMoreButton 
                        onClick={handleViewMore}
                        isLoading={isLoading}
                    />
                )}
            </ErrorBoundary>
        </div>
    );
}


