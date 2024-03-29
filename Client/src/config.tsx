import { io, Socket } from "socket.io-client";

const SOCKET_URL = 'https://todo-types-server.herokuapp.com/';

// const SOCKET_URL = 'http://localhost:4000';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);

export const authenticateUser = (async (userName: string, pass: string, callback: Function) => {
  socket.emit('login', { userName, pass });
  socket.on('loginResult', (user: loginInfo) => callback(user));
});

export const createUser = (username: string, password: string, callback: Function) => {
  socket.emit('signup', { username, password, id: Date.now() });
  socket.on('loginResult', (user: loginInfo | null | string) => callback(user));
};
