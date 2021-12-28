import { Server, Socket } from 'socket.io';
import { Item, ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, EVENTS } from './types';
import { createItem, getItem } from './db';

const port: number = 4000;

let initialItems: Array<Item> = [
  {title: 'SuperMarket List', complete: false, desc: 'Our collaborative supermarket list for the whole family to contribute.'},
  {title: 'Walk the dog', complete: true, desc: 'Take Nala for a brief walk through the park for the night.'},
  {title: 'it is working', complete: false}
];

const filterItems = (value: boolean) => {
  const filteredItems = initialItems.filter(item => item.complete === value);
  io.emit('returnFilteredData', filteredItems);
};

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(port, {
  cors: {origin: ['http://localhost:3000']}
});

io.on("connection", async (socket: Socket) => {
  const data = await getItem();
  io.emit('items', data);

  socket.on('addItem', (newItem) => {
    const completeItem: Item = {title: newItem.title, complete: false, desc: newItem.desc}
    initialItems.push(completeItem);
    createItem(completeItem);
    io.emit('items', initialItems);
  });

  socket.on('changeStatus', (selectedItem: string) => {
    initialItems = initialItems.map(item => item.title === selectedItem ? {...item, complete: !item.complete} : item);
    io.emit('items', initialItems);
  });

  socket.on('removeItem', (selectedItem: string) => {
    initialItems = initialItems.filter(item => item.title !== selectedItem);
    io.emit('items', initialItems);
  });

  socket.on('filterCompleted', () => {
    filterItems(true);
  });

  socket.on('filterPending', () => {
    filterItems(false);
  });

});

// socket.emit('send-items', initialItems);
