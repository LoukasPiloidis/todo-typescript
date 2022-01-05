import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { Welcome } from './components/Welcome';
import './styles/App.css';
import { UserCard } from "./components/UserCard";
import { Logout } from "./components/Logout";
import Burger from "./components/Burger";
import { About } from "./components/About";
import { Login } from "./components/Login";

const App = () => {
  const [user, setUser] = useState<string | null>(null);

  const getUser = (user: string | null) => setUser(user);

  return(
    <React.Fragment>
        <Burger user={user} />
        <h1>Todo app on Steroids</h1>
        <Routes>
          <Route path='/' element={<Welcome />}></Route>
          <Route path="/logout" element={<Logout getUser={getUser} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/:id" element={<UserCard getUser={getUser} />}></Route>
        </Routes>
    </React.Fragment>
  ) 
}

export default App;
