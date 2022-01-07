import { Server } from 'socket.io';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { createItem, getItem, updateStatus, deleteItem, getFilteredItems, updateListItems, updateFinanceItems, updateDailyItems, updateDailyStatus, updateListStatus, userLogin, userSignup } from './db/mongo.js';
config();
const port = process.env.PORT || 4000;
const io = new Server(port, {
    cors: {
        allowedHeaders: ["Access-Control-Allow-Origin", "*"],
        credentials: true
    },
});
const hash = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};
const filterItems = async (value, id) => {
    const filteredItems = await getFilteredItems(value, id);
    io.emit('returnFilteredData', filteredItems);
};
io.on("connection", async (socket) => {
    socket.on('getItems', async (id) => {
        const data = await getItem(id);
        io.emit('items', data);
    });
    socket.on('addItem', async (newItem) => {
        const completeItem = { title: newItem.title, complete: false, desc: newItem.desc, id: newItem.id, list: [], finance: [], daily: [] };
        await createItem(completeItem);
        const data = await getItem(newItem.id);
        io.emit('items', data);
    });
    socket.on('changeStatus', async (selectedItem) => {
        await updateStatus(selectedItem);
        const data = await getItem(selectedItem.id);
        io.emit('items', data);
    });
    socket.on('removeItem', async (selectedItem) => {
        await deleteItem(selectedItem.title);
        const data = await getItem(selectedItem.id);
        io.emit('items', data);
    });
    socket.on('filterCompleted', (id) => filterItems(true, id));
    socket.on('filterPending', (id) => filterItems(false, id));
    socket.on('filterReset', async (id) => {
        const data = await getItem(id);
        socket.emit('items', data);
    });
    socket.on('addListItem', async (value) => {
        await updateListItems(value);
        const data = await getItem(value.id);
        socket.emit('items', data);
    });
    socket.on('addFinanceItem', async (value) => {
        await updateFinanceItems(value);
        const data = await getItem(value.id);
        socket.emit('items', data);
    });
    socket.on('addDailyItem', async (value) => {
        await updateDailyItems(value);
        const data = await getItem(value.id);
        socket.emit('items', data);
    });
    socket.on('changeDailyStatus', async (selectedItem) => {
        await updateDailyStatus(selectedItem);
        const data = await getItem(selectedItem.selectedItem.id);
        io.emit('items', data);
    });
    socket.on('changeListStatus', async (selectedItem) => {
        await updateListStatus(selectedItem);
        const data = await getItem(selectedItem.selectedItem.id);
        io.emit('items', data);
    });
    socket.on('login', async (item) => {
        const user = await userLogin(item);
        socket.emit('loginResult', user);
    });
    socket.on('signup', async (item) => {
        const prevPass = item.password;
        const hashedPass = await hash(item.password);
        item.password = hashedPass;
        const signup = await userSignup(item);
        if (signup === 'duplicate value') {
            return socket.emit('loginResult', { username: 'This user already exists' });
        }
        ;
        const user = await userLogin({ userName: item.username, pass: prevPass });
        socket.emit('loginResult', user);
    });
});
