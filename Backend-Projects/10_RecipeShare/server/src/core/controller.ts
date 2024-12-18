import { Request, Response } from 'express';
import prisma from '../config/db';
import fs from 'fs';
import sharp from 'sharp';

export const listRecipes = async (req: Request, res: Response): Promise<void> => {
    const { search, chef, label, page = 1 } = req.query;
    const perPage = 10;

    const filters: any = {};
    if (search) filters.OR = [{ title: { contains: search as string } }, { description: { contains: search as string } }];
    if (chef) filters.chefId = Number(chef);
    if (label) filters.labels = { has: label };

    try {
        const recipes = await prisma.recipe.findMany({
            where: filters,
            include: { chef: true },
            skip: (Number(page) - 1) * perPage,
            take: perPage,
        });

        res.json(recipes);
        return;
    } catch (error) {
        console.error('Error listing recipes:', error);
        res.status(500).json({ error: 'Error listing recipes' });
        return;
    }
};

export const getRecipe = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({ error: 'Invalid recipe ID format' });
        return;
    }

    try {
        const recipe = await prisma.recipe.findUnique({ where: { id: Number(id) }, include: { chef: true } });
        if (!recipe) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }
        res.json(recipe);
    } catch (error) {
        console.error('Error getting recipe:', error);
        res.status(500).json({ error: 'Error getting recipe' });
        return;
    }
};


export const createRecipe = async (req: Request, res: Response): Promise<void> => {
    const { title, description, ingredients, instructions, labels } = req.body;
    const userId = (req as any).user.id;

    // Validate required fields
    if (!title || !description || !ingredients || !instructions) {
        res.status(400).json({ error: 'Title, description, ingredients, and instructions are required' });
        return;
    }
    
    let imagePath = null;
    if (req.file) {
        const imageName = `uploads/${Date.now()}-${req.file.originalname}`;
        try {
            await sharp(req.file.path).resize(800, 600).toFile(imageName);
            fs.unlinkSync(req.file.path);
            imagePath = imageName;
        } catch (error) {
            console.error('Error processing image:', error);
            res.status(500).json({ error: 'Error processing image' });
            return;
        }
    }

    try {
        const recipe = await prisma.recipe.create({
            data: {
                title,
                description,
                ingredients,
                instructions,
                image: imagePath,
                labels: labels?.split(','),
                chefId: userId,
            },
        });
        res.status(201).json(recipe);
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Error creating recipe' });
    }
};

export const updateRecipe = async (req: Request, res: Response): Promise<void> => {
    console.log('Updating recipe...');
    const { id } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) {
        console.log('Unauthorized checking...');
        res.status(403).json({ error: 'Unauthorized working 1' });
        return;
    }

    if (isNaN(Number(id))) {
        res.status(400).json({ error: 'Invalid recipe ID format' });
        return;
    }

    try {
        const recipe = await prisma.recipe.findUnique({ where: { id: Number(id) } });
        if (!recipe) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }

        if (recipe.chefId !== userId) {
            res.status(403).json({ error: 'Unauthorized working 2' });
            return;
        }

        const updatedRecipe = await prisma.recipe.update({
            where: { id: Number(id) },
            data: req.body,
        });

        res.json(updatedRecipe);
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ error: 'Error updating recipe' });
    }
    return;
};

export const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = (req as any).user.id;

    if (isNaN(Number(id))) {
        res.status(400).json({ error: 'Invalid recipe ID format' });
        return;
    }

    try {
        const recipe = await prisma.recipe.findUnique({ where: { id: Number(id) } });
        if (!recipe) {
           res.status(404).json({ error: 'Recipe not found' });
           return;
        }

        if (recipe.chefId !== userId) {
            res.status(403).json({ error: 'Unauthorized' });
            return;
        }

        await prisma.recipe.delete({ where: { id: Number(id) } });
        res.json({ message: 'Recipe deleted' });
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ error: 'Error deleting recipe' });
    }
    return;
};