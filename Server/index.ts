import { Server, Socket } from 'socket.io';
import { Item, ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, EVENTS } from './types';

const port: number = 4000;

const initialItems: Array<Item> = [
  {text: 'walk the dog', complete: true, subItems: {text: 'text2', complete: false}},
  {text: 'write app', complete: false},
  {text: 'it is working', complete: false}
];

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(port, {
  cors: {origin: ['http://localhost:3000']}
});

io.on("connection", (socket: Socket) => {
  console.log(socket.id);
  io.emit('items', initialItems);
  });

// socket.emit('send-items', initialItems);
