import { Server, Socket } from 'socket.io';
import { Item, ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, EVENTS, removeObject, addListItem, addFinanceItem, addDailyItem, toggleDailyItem, userLoginInfo, userSignupInfo } from './types';
import { createItem, getItem, updateStatus, deleteItem, getFilteredItems, updateListItems, updateFinanceItems, updateDailyItems, updateDailyStatus, userLogin, userSignup } from './db';

const port: number = 4000;

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(port, {
  cors: {origin: ['http://localhost:3000']}
});

const filterItems =  async(value: boolean, id: string) => {
  
  const filteredItems: Array<Item> | unknown = await getFilteredItems(value, id);
  
  io.emit('returnFilteredData', filteredItems);
};

io.on("connection", async (socket: Socket) => {

  socket.on('getItems', async (id) => {
    const data = await getItem(id);
    io.emit('items', data);
  });

  socket.on('addItem', async (newItem: Item) => {
    const completeItem: Item = {title: newItem.title, complete: false, desc: newItem.desc, id: newItem.id, list: [], finance: [], daily: []}
    await createItem(completeItem);
    const data = await getItem(newItem.id);
    io.emit('items', data);
  });

  socket.on('changeStatus', async (selectedItem: Item) => {
    await updateStatus(selectedItem);
    const data = await getItem(selectedItem.id);
    io.emit('items', data);
  });

  socket.on('removeItem', async (selectedItem: removeObject) => {
    console.log(selectedItem);
    
    await deleteItem(selectedItem.title);
    const data = await getItem(selectedItem.id);
    io.emit('items', data);
  });

  socket.on('filterCompleted', (id: string) => filterItems(true, id));

  socket.on('filterPending', (id: string) => filterItems(false, id));

  socket.on('addListItem', async (value: addListItem) => {
    await updateListItems(value);
    const data = await getItem(value.id);
    socket.emit('items', data);
  });

  socket.on('addFinanceItem', async (value: addFinanceItem) => {
    await updateFinanceItems(value);
    const data = await getItem(value.id);
    socket.emit('items', data);
  });

  socket.on('addDailyItem', async (value: addDailyItem) => {
    await updateDailyItems(value);
    const data = await getItem(value.id);
    socket.emit('items', data);
  });

  socket.on('changeDailyStatus', async (selectedItem: toggleDailyItem) => {
    await updateDailyStatus(selectedItem);
    const data = await getItem(selectedItem.selectedItem.id);
    io.emit('items', data);
  });

  socket.on('login', async (item: userLoginInfo) => {
    const user = await userLogin(item);
    socket.emit('loginResult', user);
  });

  socket.on('signup', async (item: userSignupInfo) => {
    await userSignup(item);
    const user = await userLogin({userName: item.username, pass: item.password});
    console.log(user);
    socket.emit('loginResult', user);
  });
});
