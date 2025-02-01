import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

let db: Db;

export const connectDatabase = async () => {
    try {
        await client.connect();
        db = client.db('personalBudgetingDB');
        console.log('Database connection successful');
    } catch (error) {
        console.error(`Database connection error: ${error}`);
        process.exit(1);
    }
};

export const getDB = (): Db => {
    if (!db) throw new Error("Database not initialized.");
    return db;
}