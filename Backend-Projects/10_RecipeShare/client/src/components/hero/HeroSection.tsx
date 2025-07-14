import React from "react";

interface HeroSectionProps {
    title: string;
    description: string;
}
  
export function HeroSection({ title, description }: HeroSectionProps) {
    return (
      <div className="px-8 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4 text-blue-200">{title}</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-blue-300">{description}</p>
      </div>
    );
}