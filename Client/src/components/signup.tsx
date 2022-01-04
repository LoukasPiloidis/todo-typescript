import React, { useState, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { createUser } from "../config";
import '../styles/Signup.css';

export const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassname] = useState<string>('');
  const [password2, setPass2name] = useState<string>('');
  const [passError, setPassError] = useState<string>();

  const navigate = useNavigate();

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);
  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => setPassname(e.currentTarget.value);
  const handlePass2Change = (e: ChangeEvent<HTMLInputElement>) => setPass2name(e.currentTarget.value);

  const handleNavigate = (user: loginInfo | null) => {
    if (!user) { return console.log('login failed') };
    if (user) { 
      localStorage.setItem('user', user.username);
      return navigate(user.username);
    }; 
  };

  // const handleExistingSubmit = async () => await authenticateUser(username, password, handleNavigate);

    
  const handleNewSubmit = () => password === password2 ? createUser(username, password, handleNavigate) : setPassError('passwords do not match');

  return (
    <div className="signup__main">
      <label className="main__title">Sign Up</label>
      <input type='text' className="main__input" placeholder="enter a username" onChange={handleUserChange}></input>
      <input type='text' className="main__input" placeholder="enter a password" onChange={handlePassChange}></input>
      <input type='text' className="main__input" placeholder="reenter a password" onChange={handlePass2Change}></input>
      <p>{passError}</p>
      <button type='submit' className="main__button" onClick={handleNewSubmit}>Create</button>
    </div>
  );
};