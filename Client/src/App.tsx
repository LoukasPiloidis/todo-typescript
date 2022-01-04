import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { AddItemForm } from "./components/AddItemForm";
import { ItemList } from "./components/ItemList";
import { io, Socket } from "socket.io-client";
import { Welcome } from './components/Welcome';
import './styles/App.css';
import { UserCard } from "./components/UserCard";
import { Logout } from "./components/Logout";
import Burger from "./components/Burger";

// const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:4000';

// const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);

const App = () => {
  const [user, setUser] = useState<string | null>(null);

  const getUser = (user: string | null) => setUser(user);

  return(
    <React.Fragment>
        <Burger user={user} />
        <h1>Todo app on Steroids</h1>
        <Routes>
          <Route path='/' element={<Welcome />}>
          </Route>
          <Route path="/logout" element={<Logout getUser={getUser} />}>
          </Route>
          <Route path="/:id" element={<UserCard getUser={getUser} />}>
          </Route>
        </Routes>
    </React.Fragment>
  ) 
}

export default App;
