import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { Item, addListItem, addFinanceItem } from './types';

config();

const uri = `mongodb+srv://Utes:${process.env.MONGO_PASS}@cluster0.qt1uh.mongodb.net/Todo-typescript?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

export const createItem = async (item: Item) => {
  console.log('hi');

  await client.connect();
  await client.db("Todo-typescript").collection("Items").insertOne(item);
  await client.close();
};

export const getItem = async (id: string) => {
  await client.connect();
  return new Promise((resolve, reject) => {
    client.db("Todo-typescript").collection("Items").find({id}).toArray((err, data) => {
      if (err) {
      return reject(err);
      };
    return resolve(data);
    });
  });
};

export const getFilteredItems = async (status: boolean, id: string) => {
  await client.connect();
  return new Promise((resolve, reject) => {
    client.db("Todo-typescript").collection("Items").find({complete: status, id}).toArray((err, data) => {
      if (err) {
      return reject(err);
      };
    return resolve(data);
    });
  });
}

export const updateStatus = async (item: Item) => {
  await client.connect();
  await client.db("Todo-typescript").collection("Items").updateOne({ title: item.title }, { $set: { complete: !item.complete }});
  await client.close();
};

export const deleteItem = async (item: string) => {
  await client.connect();
  await client.db("Todo-typescript").collection("Items").deleteOne({title: item});
  await client.close();
};

export const updateListItems = async (item: addListItem) => {
  await client.connect();
  await client.db("Todo-typescript").collection("Items").updateOne({ title: item.title }, { $push: { list: item.element }});
  await client.close();
};

export const updateFinanceItems = async (item: addFinanceItem) => {
  await client.connect();
  await client.db("Todo-typescript").collection("Items").updateOne({ title: item.title }, { $push: { finance: item.item }});
  await client.close();
};