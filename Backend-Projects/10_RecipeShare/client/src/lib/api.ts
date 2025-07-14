import axios from 'axios';
import type { Recipe } from '../types';

const api = axios.create({
  baseURL: '/api',
});

export const fetchRecipes = async (page = 1, search = ''): Promise<{ recipes: Recipe[]; total: number }> => {
  const { data } = await api.get<{ recipes: Recipe[]; total: number }>(`/recipes?page=${page}&search=${search}`);
  return data;
};

export const likeRecipe = async (id: number): Promise<Recipe> => {
  const { data } = await api.post<Recipe>(`/recipes/${id}/like`);
  return data;
};