import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { Item } from './types';

config();

const uri = `mongodb+srv://Utes:${process.env.MONGO_PASS}@cluster0.qt1uh.mongodb.net/Todo-typescript?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

export const createItem = async (item: Item) => {
  console.log('hi');

  await client.connect();
  await client.db("Todo-typescript").collection("Items").insertOne(item);
  await client.close();
};