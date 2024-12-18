import express from 'express';
import { listRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } from './controller';
import { authenticate } from '../middleware/auth';
import multer from 'multer';

const router = express.Router();

// multer setup for imag uploads
const upload = multer({ dest: 'uploads/' });

// public routes
router.get('/', listRecipes);
router.get('/:id', getRecipe);

// protected routes
router.post('/', authenticate, upload.single('image'), createRecipe);
router.put('/:id', authenticate, updateRecipe);
router.delete('/:id', authenticate, deleteRecipe);

export default router;