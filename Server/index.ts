import { Server, Socket } from 'socket.io';
import { Item, ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, EVENTS } from './types';
import { createItem, getItem, updateStatus, deleteItem } from './db';

const port: number = 4000;

// const filterItems = (value: boolean) => {
//   const filteredItems = initialItems.filter(item => item.complete === value);
//   io.emit('returnFilteredData', filteredItems);
// };

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(port, {
  cors: {origin: ['http://localhost:3000']}
});

io.on("connection", async (socket: Socket) => {
  const data = await getItem();
  io.emit('items', data);

  socket.on('addItem', async (newItem) => {
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

  // socket.on('filterCompleted', () => {
  //   filterItems(true);
  // });

  // socket.on('filterPending', () => {
  //   filterItems(false);
  // });

});

// socket.emit('send-items', initialItems);
