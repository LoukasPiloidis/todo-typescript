import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
config();
const uri = `mongodb+srv://Utes:${process.env.MONGO_PASS}@cluster0.qt1uh.mongodb.net/Todo-typescript?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
await client.connect();
const db = client.db(process.env.DB_NAME || process.env.DB_NAME_TEST);
export const itemsCollection = db.collection(process.env.DB_COLLECTION || process.env.DB_COLLECTION_TEST);
export const usersCollection = db.collection(process.env.DB_COLLECTION2 || process.env.DB_COLLECTION2_TEST);
