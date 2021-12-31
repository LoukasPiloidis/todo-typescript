import { Server, Socket } from 'socket.io';
import { Item, ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, EVENTS } from './types';
import { createItem, getItem, updateStatus, deleteItem, getFilteredItems } from './db';

const port: number = 4000;

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(port, {
  cors: {origin: ['http://localhost:3000']}
});

const filterItems =  async(value: boolean) => {
  const filteredItems: Array<Item> | unknown = await getFilteredItems(value);
  
  io.emit('returnFilteredData', filteredItems);
};

// const userId = io.of('/loukas');
// userId.on('connection', (socket: Socket) => {
//   console.log('we are connected to Loukas user');
// })

io.on("connection", async (socket: Socket) => {

  socket.on('getItems', async () => {
    const data = await getItem();
    io.emit('items', data);
  });

  socket.on('addItem', async (newItem: Item) => {
    const completeItem: Item = {title: newItem.title, complete: false, desc: newItem.desc}
    await createItem(completeItem);
    const data = await getItem();
    io.emit('items', data);
  });

  socket.on('changeStatus', async (selectedItem: Item) => {
    await updateStatus(selectedItem);
    const data = await getItem();
    io.emit('items', data);
  });

  socket.on('removeItem', async (selectedItem: string) => {
    await deleteItem(selectedItem);
    const data = await getItem();
    io.emit('items', data);
  });

  socket.on('filterCompleted', () => {
    filterItems(true);
  });

  socket.on('filterPending', () => {
    filterItems(false);
  });

});
