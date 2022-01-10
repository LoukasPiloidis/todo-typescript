import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const uri = `mongodb+srv://Utes:${process.env.MONGO_PASS}@cluster0.qt1uh.mongodb.net/Todo-typescript?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
await client.connect();

const db = client.db('Todo-typescript');
export const itemsCollection = db.collection('Items');
export const usersCollection = db.collection('Users');

export const createItem = async (item: Item) => {
  await itemsCollection.insertOne(item);
};

export const getItem = async (id: string) => {
  return new Promise((resolve, reject) => {
    itemsCollection.find({id}).toArray((err, data) => {
      if (err) {
      return reject(err);
      };
    return resolve(data);
    });
  });
};

export const getFilteredItems = async (status: boolean, id: string) => {
  return new Promise((resolve, reject) => {
    itemsCollection.find({complete: status, id}).toArray((err, data) => {
      if (err) {
      return reject(err);
      };
    return resolve(data);
    });
  });
};

export const updateStatus = async (item: Item) => {
  await itemsCollection.updateOne({ title: item.title }, { $set: { complete: !item.complete }});
};

export const deleteItem = async (item: string) => {
  await itemsCollection.deleteOne({title: item});
};

export const updateListItems = async (item: addListItem) => {
  await itemsCollection.updateOne({ title: item.title }, { $push: { list: item.fullElement }});
};

export const updateFinanceItems = async (item: addFinanceItem) => {
  await itemsCollection.updateOne({ title: item.title }, { $push: { finance: item.item }});
};

export const updateDailyItems = async (item: addDailyItem) => {
  await itemsCollection.updateOne({ title: item.title }, { $push: { daily: item.item }});
};

export const updateDailyStatus = async (item: toggleDailyItem) => {
  await itemsCollection.updateOne({title: item.parentItem, "daily.title": item.selectedItem.title}, { "$set": { "daily.$.complete": !item.selectedItem.complete }});
};

export const updateListStatus = async (item: toggleDailyItem) => {
  await itemsCollection.updateOne({title: item.parentItem, "list.element": item.selectedItem.title}, { "$set": { "list.$.complete": !item.selectedItem.complete }});
};

export const userLogin = async (item: userLoginInfo) => {
  try {
    const user = await usersCollection.findOne({username: item.userName});
    if (user) {
      const validate = await bcrypt.compare(item.pass, user?.password);
      if (validate) {
        const userInfo = {username: user.username, id: user.id}
         return userInfo
        };
    };
    return { username: 'failed to login' };
  } catch(err) {
    return (err);
  };
};

export const userSignup = async (item: userSignupInfo) => {
  try {
    await usersCollection.insertOne(item);
  } catch(err) {
    return 'duplicate value';
  };
};
