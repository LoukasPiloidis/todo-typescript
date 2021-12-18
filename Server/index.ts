import { Server, Socket } from 'socket.io';
import { Item, ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, EVENTS } from './types';

const port: number = 4000;

let initialItems: Array<Item> = [
  {text: 'walk the dog', complete: true, subItems: {text: 'text2', complete: false}},
  {text: 'write app', complete: false},
  {text: 'it is working', complete: false}
];

const filterItems = (value: boolean) => {
  const filteredItems = initialItems.filter(item => item.complete === value);
  io.emit('returnFilteredData', filteredItems);
};

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(port, {
  cors: {origin: ['http://localhost:3000']}
});

io.on("connection", (socket: Socket) => {
  console.log(socket.id);
  io.emit('items', initialItems);

  socket.on('addItem', (newItem: string) => {
    const completeItem: Item = {text: newItem, complete: false}
    initialItems.push(completeItem);
    io.emit('items', initialItems);
  });

  socket.on('changeStatus', (selectedItem: string) => {
    initialItems = initialItems.map(item => item.text === selectedItem ? {...item, complete: !item.complete} : item);
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
