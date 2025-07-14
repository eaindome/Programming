// libraries
import cors from 'cors';;
import dotenv from 'dotenv';
import express from 'express';
import { connectDatabase } from './config/database';
import authRoutes from './modules/auth/auth.routes';

// functionalities
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// connect to the database if not in test environment
if (process.env.NODE_ENV !== 'test') {
    try {
        connectDatabase();
    } catch (error) {
        console.error(`Database connection error: ${error}`);
        process.exit(1);
    }
}

// routes
app.use('/api/auth', authRoutes);

// error handling middleware
app.use(errorHandler);

export default app;