import { Search, Filter } from "lucide-react";
import React from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto flex gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-3 text-blue-300" size={20} />
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-blue-300 
                   border border-blue-100 shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-transparent"
        />
      </div>
      <button className="px-4 py-2 rounded-lg flex items-center gap-2 bg-green text-white transition-opacity hover:opacity-90">
        <Filter size={20} />
        Filters
      </button>
    </div>
  );
}