import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { Item, 
  addListItem, 
  addFinanceItem, 
  addDailyItem, 
  toggleDailyItem, 
  userLoginInfo, 
  userSignupInfo } from './types';

config();

const uri = `mongodb+srv://Utes:${process.env.MONGO_PASS}@cluster0.qt1uh.mongodb.net/Todo-typescript?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

export const createItem = async (item: Item) => {
  await client.connect();
  await client.db("Todo-typescript").collection("Items").insertOne(item);
  await client.close();
};

export const getItem = async (id: string) => {
  await client.connect();
  return new Promise((resolve, reject) => {
    client.db("Todo-typescript").collection("Items").find({id}).toArray((err, data) => {
      if (err) {
      client.close();
      return reject(err);
      };
    client.close();
    return resolve(data);
    });
  });
};

export const getFilteredItems = async (status: boolean, id: string) => {
  await client.connect();
  return new Promise((resolve, reject) => {
    client.db("Todo-typescript").collection("Items").find({complete: status, id}).toArray((err, data) => {
      if (err) {
      client.close();
      return reject(err);
      };
    client.close();
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

export const updateDailyItems = async (item: addDailyItem) => {
  await client.connect();
  await client.db("Todo-typescript").collection("Items").updateOne({ title: item.title }, { $push: { daily: item.item }});
  await client.close();
};

export const updateDailyStatus = async (item: toggleDailyItem) => {
  await client.connect();
  await client.db("Todo-typescript").collection("Items").updateOne({title: item.parentItem, "daily.title": item.selectedItem.title}, { "$set": { "daily.$.complete": !item.selectedItem.complete }});
  await client.close();
};

export const userLogin = async (item: userLoginInfo) => {
  await client.connect();
  const user = await client.db("Todo-typescript").collection("Users").findOne({username: item.userName, password: item.pass});
  await client.close();
  return user;
};

export const userSignup = async (item: userSignupInfo) => {
  await client.connect();
  try {
    await client.db("Todo-typescript").collection("Users").insertOne(item);
  } catch(err) {
    await client.close();
    return 'duplicate value';
  };
  await client.close();
};
