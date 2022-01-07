import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { createItem, 
  getItem, 
  updateStatus, 
  deleteItem, 
  getFilteredItems, 
  updateListItems, 
  updateFinanceItems, 
  updateDailyItems, 
  updateDailyStatus, 
  updateListStatus,
  userLogin, 
  userSignup } from '../db';

import { Item,
  addListItem, 
  addFinanceItem, 
  addDailyItem, 
  toggleDailyItem, 
  userLoginInfo, 
  userSignupInfo } from '../types';

import { getUser, removeUser, removeItem } from './main';

config();

const uri = `mongodb+srv://Utes:${process.env.MONGO_PASS}@cluster0.qt1uh.mongodb.net/Todo-typescript?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

describe('should test Users Functions', () => {
  const userInfoSignUp: userSignupInfo = { username: 'test1', password: 'test1', id: 101};
  const userInfoLogin: userLoginInfo = { userName: 'Nice', pass: 'test' };
  const userLoginData = { username: 'Nice', id: 1641553937762 };
  
  test('should signup a user into collection', async () => {
    await removeUser(userInfoSignUp.username);
    await userSignup(userInfoSignUp);
    const dbUser = await getUser(userInfoSignUp.username);
    expect(dbUser).toEqual(userInfoSignUp);
  });

  test('should login a user into collection', async () => {
    const dbUser = await userLogin(userInfoLogin);
    expect(dbUser).toEqual(userLoginData);
  });
});

describe('should test Items Functions', () => {
  const item: Item = { title: 'title', desc: 'desc', complete: false, id: 'Nice', list: [], finance: [], daily: []};
  const userLoginData = { username: 'Nice', id: 1641553937762 };
  const listItem: addListItem = { title: 'listTest', id: 'Nice', complete: false, fullElement: { element: 'bananas', complete: false }};
  const financeItem: addFinanceItem = { title: 'listTest', id: 'Nice', item: {title: 'pen', price: '10' }};
  const dailyItem: addDailyItem = { title: 'listTest', id: 'Nice', item: {title: 'walk', desc: 'the dog', complete: false }};

  
  test('should create, update, get, and delete item from collection', async () => {
    await deleteItem(item.title);
    await createItem(item);
    await updateStatus(item);
    const userItems: any = await getItem(userLoginData.username);    
    expect(userItems.length).toEqual(1);
  });

  test('should test lists within an item', async () => {

    await updateListItems(listItem);
    await updateFinanceItems(financeItem);
    await updateDailyItems(dailyItem);
    const userItems: any = await getItem(userLoginData.username);
    console.log(userItems);
    
    // expect(userItems.list).toEqual([listItem]);
    // expect(userItems.finance).toEqual([financeItem]);
    // expect(userItems.daily).toEqual([dailyItem]);
  });
});