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
export const getUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    const data = yield client.db("Todo-typescript").collection("Users").findOne({ username });
    yield client.close();
    return data;
});
export const removeUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    yield client.db("Todo-typescript").collection("Users").deleteOne({ username });
    yield client.close();
});
export const removeItem = (id, title) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    yield client.db("Todo-typescript").collection("Items").deleteOne({ title, id });
    yield client.close();
});
