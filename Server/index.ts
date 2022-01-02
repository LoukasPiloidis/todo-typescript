import { Server, Socket } from 'socket.io';
import { Item, ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, EVENTS, removeObject } from './types';
import { createItem, getItem, updateStatus, deleteItem, getFilteredItems } from './db';

const port: number = 4000;

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(port, {
  cors: {origin: ['http://localhost:3000']}
});

const filterItems =  async(value: boolean, id: string) => {
  
  const filteredItems: Array<Item> | unknown = await getFilteredItems(value, id);
  
  io.emit('returnFilteredData', filteredItems);
};

// const userId = io.of('/loukas');
// userId.on('connection', (socket: Socket) => {
//   console.log('we are connected to Loukas user');
// })

io.on("connection", async (socket: Socket) => {

  socket.on('getItems', async (id) => {
    const data = await getItem(id);
    io.emit('items', data);
  });

  socket.on('addItem', async (newItem: Item) => {
    const completeItem: Item = {title: newItem.title, complete: false, desc: newItem.desc, id: newItem.id}
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

});
