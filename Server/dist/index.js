var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Server } from 'socket.io';
import { config } from 'dotenv';
import { createItem, getItem, updateStatus, deleteItem, getFilteredItems, updateListItems, updateFinanceItems, updateDailyItems, updateDailyStatus, userLogin, userSignup } from './db.js';
config();
const port = process.env.PORT || 4000;
const io = new Server(port, {
    allowRequest: (req, callback) => {
        const noOriginHeader = req.headers.origin === undefined;
        callback(null, noOriginHeader);
    },
});
const filterItems = (value, id) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredItems = yield getFilteredItems(value, id);
    io.emit('returnFilteredData', filteredItems);
});
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on('getItems', (id) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield getItem(id);
        io.emit('items', data);
    }));
    socket.on('addItem', (newItem) => __awaiter(void 0, void 0, void 0, function* () {
        const completeItem = { title: newItem.title, complete: false, desc: newItem.desc, id: newItem.id, list: [], finance: [], daily: [] };
        yield createItem(completeItem);
        const data = yield getItem(newItem.id);
        io.emit('items', data);
    }));
    socket.on('changeStatus', (selectedItem) => __awaiter(void 0, void 0, void 0, function* () {
        yield updateStatus(selectedItem);
        const data = yield getItem(selectedItem.id);
        io.emit('items', data);
    }));
    socket.on('removeItem', (selectedItem) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(selectedItem);
        yield deleteItem(selectedItem.title);
        const data = yield getItem(selectedItem.id);
        io.emit('items', data);
    }));
    socket.on('filterCompleted', (id) => filterItems(true, id));
    socket.on('filterPending', (id) => filterItems(false, id));
    socket.on('filterReset', (id) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield getItem(id);
        socket.emit('items', data);
    }));
    socket.on('addListItem', (value) => __awaiter(void 0, void 0, void 0, function* () {
        yield updateListItems(value);
        const data = yield getItem(value.id);
        socket.emit('items', data);
    }));
    socket.on('addFinanceItem', (value) => __awaiter(void 0, void 0, void 0, function* () {
        yield updateFinanceItems(value);
        const data = yield getItem(value.id);
        socket.emit('items', data);
    }));
    socket.on('addDailyItem', (value) => __awaiter(void 0, void 0, void 0, function* () {
        yield updateDailyItems(value);
        const data = yield getItem(value.id);
        socket.emit('items', data);
    }));
    socket.on('changeDailyStatus', (selectedItem) => __awaiter(void 0, void 0, void 0, function* () {
        yield updateDailyStatus(selectedItem);
        const data = yield getItem(selectedItem.selectedItem.id);
        io.emit('items', data);
    }));
    socket.on('login', (item) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userLogin(item);
        socket.emit('loginResult', user);
    }));
    socket.on('signup', (item) => __awaiter(void 0, void 0, void 0, function* () {
        const signup = yield userSignup(item);
        if (signup === 'duplicate value') {
            return socket.emit('loginResult', { username: 'This user already exists' });
        }
        ;
        const user = yield userLogin({ userName: item.username, pass: item.password });
        socket.emit('loginResult', user);
    }));
}));
