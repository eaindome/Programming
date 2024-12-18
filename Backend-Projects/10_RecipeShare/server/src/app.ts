import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './auth/routes';
import recipeRoutes from './core/routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

export default app;