import React, { useState, ChangeEvent } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { authenticateUser } from "../config";
import '../styles/Welcome.css';

export const Welcome: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassname] = useState<string>('');

  const navigate = useNavigate();

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);
  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => setPassname(e.currentTarget.value);

  const handleNavigate = (user: loginInfo | null) => {
    if (!user) { return console.log('login failed') };
    if (user) { 
      localStorage.setItem('user', user.username);
      return navigate(user.username) 
    }; 
  };

  const handleExistingSubmit = async () => await authenticateUser(username, password, handleNavigate);
  
  const handleNewSubmit = () => {
    const id = Date.now().toString();
    navigate(id);
  }

  return (
    <div className="welcome__main">
      <label className="main__title">Join an existing project</label>
      <input type='text' className="main__input" placeholder="enter your username" onChange={handleUserChange}></input>
      <input type='text' className="main__input" placeholder="enter your password" onChange={handlePassChange}></input>
      <button type='submit' className="main__button" onClick={handleExistingSubmit}>Go</button>
      <label className="main__title">Create a new project</label>
      {/* <input type='text' className="main__input" placeholder="name your project" onChange={handleChange}></input> */}
      <button type='submit' className="main__button" onClick={handleNewSubmit}>Create</button>
    </div>
  );
};
