import { MongoClient } from 'mongodb';
import { config } from 'dotenv';  

config();

const uri = `mongodb+srv://Utes:${process.env.MONGO_PASS}@cluster0.qt1uh.mongodb.net/Todo-typescript?retryWrites=true&w=majority`;
const client = new MongoClient(uri);


export const getUser = async (username: string) => {
  await client.connect();
  const data = await client.db("Todo-typescript").collection("Users").findOne({username});
  await client.close();
  return data;
};

export const removeUser = async (username: string) => {
  await client.connect();
  await client.db("Todo-typescript").collection("Users").deleteOne({username});
  await client.close();
};

export const removeItem = async (id: string, title: string) => {
  await client.connect();
  await client.db("Todo-typescript").collection("Items").deleteOne({title, id});
  await client.close();
};