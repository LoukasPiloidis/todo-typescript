var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { createItem, getItem, updateStatus, deleteItem, updateListItems, updateFinanceItems, updateDailyItems, userLogin, userSignup } from '../db';
import { getUser, removeUser } from './main';
config();
const uri = `mongodb+srv://Utes:${process.env.MONGO_PASS}@cluster0.qt1uh.mongodb.net/Todo-typescript?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
describe('should test Users Functions', () => {
    const userInfoSignUp = { username: 'test1', password: 'test1', id: 101 };
    const userInfoLogin = { userName: 'Nice', pass: 'test' };
    const userLoginData = { username: 'Nice', id: 1641553937762 };
    test('should signup a user into collection', () => __awaiter(void 0, void 0, void 0, function* () {
        yield removeUser(userInfoSignUp.username);
        yield userSignup(userInfoSignUp);
        const dbUser = yield getUser(userInfoSignUp.username);
        expect(dbUser).toEqual(userInfoSignUp);
    }));
    test('should login a user into collection', () => __awaiter(void 0, void 0, void 0, function* () {
        const dbUser = yield userLogin(userInfoLogin);
        expect(dbUser).toEqual(userLoginData);
    }));
});
describe('should test Items Functions', () => {
    const item = { title: 'title', desc: 'desc', complete: false, id: 'Nice', list: [], finance: [], daily: [] };
    const userLoginData = { username: 'Nice', id: 1641553937762 };
    const listItem = { title: 'listTest', id: 'Nice', complete: false, fullElement: { element: 'bananas', complete: false } };
    const financeItem = { title: 'listTest', id: 'Nice', item: { title: 'pen', price: '10' } };
    const dailyItem = { title: 'listTest', id: 'Nice', item: { title: 'walk', desc: 'the dog', complete: false } };
    test('should create, update, get, and delete item from collection', () => __awaiter(void 0, void 0, void 0, function* () {
        yield deleteItem(item.title);
        yield createItem(item);
        yield updateStatus(item);
        const userItems = yield getItem(userLoginData.username);
        expect(userItems.length).toEqual(1);
    }));
    test('should test lists within an item', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateListItems(listItem);
        yield updateFinanceItems(financeItem);
        yield updateDailyItems(dailyItem);
        const userItems = yield getItem(userLoginData.username);
        console.log(userItems);
        // expect(userItems.list).toEqual([listItem]);
        // expect(userItems.finance).toEqual([financeItem]);
        // expect(userItems.daily).toEqual([dailyItem]);
    }));
});
