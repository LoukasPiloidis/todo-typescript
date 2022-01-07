import { itemsCollection, usersCollection } from './config.js';
import bcrypt from 'bcrypt';
export const createItem = async (item, test) => {
    if (test) {
        await test.insertOne(item);
    }
    await itemsCollection.insertOne(item);
};
export const getItem = async (id, test) => {
    if (test) {
        return new Promise((resolve, reject) => {
            test.find({ id }).toArray((err, data) => {
                if (err) {
                    return reject(err);
                }
                ;
                return resolve(data);
            });
        });
    }
    return new Promise((resolve, reject) => {
        itemsCollection.find({ id }).toArray((err, data) => {
            if (err) {
                return reject(err);
            }
            ;
            return resolve(data);
        });
    });
};
export const getFilteredItems = async (status, id) => {
    return new Promise((resolve, reject) => {
        itemsCollection.find({ complete: status, id }).toArray((err, data) => {
            if (err) {
                return reject(err);
            }
            ;
            return resolve(data);
        });
    });
};
export const updateStatus = async (item) => {
    await itemsCollection.updateOne({ title: item.title }, { $set: { complete: !item.complete } });
};
export const deleteItem = async (item) => {
    await itemsCollection.deleteOne({ title: item });
};
export const updateListItems = async (item) => {
    await itemsCollection.updateOne({ title: item.title }, { $push: { list: item.fullElement } });
};
export const updateFinanceItems = async (item) => {
    await itemsCollection.updateOne({ title: item.title }, { $push: { finance: item.item } });
};
export const updateDailyItems = async (item) => {
    await itemsCollection.updateOne({ title: item.title }, { $push: { daily: item.item } });
};
export const updateDailyStatus = async (item) => {
    await itemsCollection.updateOne({ title: item.parentItem, "daily.title": item.selectedItem.title }, { "$set": { "daily.$.complete": !item.selectedItem.complete } });
};
export const updateListStatus = async (item) => {
    await itemsCollection.updateOne({ title: item.parentItem, "list.element": item.selectedItem.title }, { "$set": { "list.$.complete": !item.selectedItem.complete } });
};
export const userLogin = async (item) => {
    try {
        const user = await usersCollection.findOne({ username: item.userName });
        if (user) {
            const validate = await bcrypt.compare(item.pass, user === null || user === void 0 ? void 0 : user.password);
            if (validate) {
                const userInfo = { username: user.username, id: user.id };
                return userInfo;
            }
            ;
        }
        ;
        return { username: 'failed to login' };
    }
    catch (err) {
        return (err);
    }
    ;
};
export const userSignup = async (item) => {
    try {
        await usersCollection.insertOne(item);
    }
    catch (err) {
        return 'duplicate value';
    }
    ;
};
