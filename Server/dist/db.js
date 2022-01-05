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
config();
const uri = `mongodb+srv://Utes:${process.env.MONGO_PASS}@cluster0.qt1uh.mongodb.net/Todo-typescript?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
export const createItem = (item) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    yield client.db("Todo-typescript").collection("Items").insertOne(item);
    yield client.close();
});
export const getItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    return new Promise((resolve, reject) => {
        client.db("Todo-typescript").collection("Items").find({ id }).toArray((err, data) => {
            if (err) {
                client.close();
                return reject(err);
            }
            ;
            client.close();
            return resolve(data);
        });
    });
});
export const getFilteredItems = (status, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    return new Promise((resolve, reject) => {
        client.db("Todo-typescript").collection("Items").find({ complete: status, id }).toArray((err, data) => {
            if (err) {
                client.close();
                return reject(err);
            }
            ;
            client.close();
            return resolve(data);
        });
    });
});
export const updateStatus = (item) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    yield client.db("Todo-typescript").collection("Items").updateOne({ title: item.title }, { $set: { complete: !item.complete } });
    yield client.close();
});
export const deleteItem = (item) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    yield client.db("Todo-typescript").collection("Items").deleteOne({ title: item });
    yield client.close();
});
export const updateListItems = (item) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    yield client.db("Todo-typescript").collection("Items").updateOne({ title: item.title }, { $push: { list: item.fullElement } });
    yield client.close();
});
export const updateFinanceItems = (item) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    yield client.db("Todo-typescript").collection("Items").updateOne({ title: item.title }, { $push: { finance: item.item } });
    yield client.close();
});
export const updateDailyItems = (item) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    yield client.db("Todo-typescript").collection("Items").updateOne({ title: item.title }, { $push: { daily: item.item } });
    yield client.close();
});
export const updateDailyStatus = (item) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    yield client.db("Todo-typescript").collection("Items").updateOne({ title: item.parentItem, "daily.title": item.selectedItem.title }, { "$set": { "daily.$.complete": !item.selectedItem.complete } });
    yield client.close();
});
export const updateListStatus = (item) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    yield client.db("Todo-typescript").collection("Items").updateOne({ title: item.parentItem, "list.element": item.selectedItem.title }, { "$set": { "list.$.complete": !item.selectedItem.complete } });
    yield client.close();
});
export const userLogin = (item) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    const user = yield client.db("Todo-typescript").collection("Users").findOne({ username: item.userName, password: item.pass });
    yield client.close();
    return user;
});
export const userSignup = (item) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    try {
        yield client.db("Todo-typescript").collection("Users").insertOne(item);
    }
    catch (err) {
        yield client.close();
        return 'duplicate value';
    }
    ;
    yield client.close();
});
