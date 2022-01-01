import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { AddItemForm } from "./components/AddItemForm";
import { ItemList } from "./components/ItemList";
import { io, Socket } from "socket.io-client";
import { Welcome } from './components/Welcome';
import './styles/App.css';
import { UserCard } from "./components/UserCard";

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:4000';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);

const App = () => {

  return(
    <React.Fragment>
        <h1>Todo app on Steroids</h1>
        <Routes>
          <Route path='/' element={<Welcome />}>
          </Route>
          <Route path="/:id" element={<UserCard />}>
          </Route>
        </Routes>
    </React.Fragment>
  ) 
}

export default App;
