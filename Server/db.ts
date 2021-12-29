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

export const getItem = async () => {
  await client.connect();
  return new Promise((resolve, reject) => {
    client.db("Todo-typescript").collection("Items").find().toArray((err, data) => {
      if (err) {
      return reject(err);
      };
    return resolve(data);
    });
  });
};

export const updateStatus = async (item: Item) => {
  await client.connect();
  await client.db("Todo-typescript").collection("Items").updateOne({ title: item.title }, { $set: { complete: !item.complete }});
  await client.close();
};

export const deleteItem = async (item: string) => {
  await client.connect();
  await client.db("Todo-typescript").collection("Items").deleteOne({title: item});
  await client.close();
}