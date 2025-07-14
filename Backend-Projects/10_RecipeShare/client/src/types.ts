// types.ts
export interface Recipe {
    id: number;
    title: string;
    chef: string;
    time: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    ingredients: string[];
    imageUrl?: string;
    likes?: number;
    isLiked?: boolean;
};

