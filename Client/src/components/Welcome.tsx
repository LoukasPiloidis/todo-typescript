import React, { useState, ChangeEvent } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { authenticateUser } from "../config";
import '../styles/Welcome.css';
import { Login } from "./Login";
import { Signup } from "./signup";

export const Welcome: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassname] = useState<string>('');
  const [password2, setPass2name] = useState<string>('');

  const navigate = useNavigate();

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);
  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => setPassname(e.currentTarget.value);
  const handlePass2Change = (e: ChangeEvent<HTMLInputElement>) => setPass2name(e.currentTarget.value);


  const handleNavigate = (user: loginInfo | null) => {
    if (!user) { return console.log('login failed') };
    if (user) { 
      localStorage.setItem('user', user.username);
      return navigate(user.username) 
    }; 
  };

  // const handleLogin = () => ;
  
  const handleNewSubmit = () => {
    const id = Date.now().toString();
    navigate(id);
  }

  return (
    <div className="welcome__main">
      {/* <button type='submit' className="main__button" onClick={handleLogin}>Login</button> */}
      <div className="hidden">
        <Login />
      </div>
        <Signup />
    </div>
  );
};
