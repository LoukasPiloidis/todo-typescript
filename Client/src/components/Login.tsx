import React, { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from "../config";
import '../styles/Login.css';

export const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassname] = useState<string>('');
  const [fail, setFail] = useState<string | undefined>();

  const navigate = useNavigate();

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);
  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => setPassname(e.currentTarget.value);

  const handleNavigate = (user: loginInfo | null) => {
    if (!user) { return setFail('login failed') };
    if (user) { 
      localStorage.setItem('user', user.username);
      return navigate(`/${user.username}`);
    }; 
  };

  const handleExistingSubmit = async () => await authenticateUser(username, password, handleNavigate);

  useEffect(() => {
    setTimeout(() => setFail(undefined), 2000);
  }, [fail]);

  return (
    <div className="login-wrapper">
      <div className="login__main">
        <label className="main__title">Login</label>
        <input type='text' className="main__input" placeholder="enter your username" onChange={handleUserChange}></input>
        <input type='password' className="main__input" placeholder="enter your password" onChange={handlePassChange}></input>
        <p>{fail}</p>
        <button type='submit' className="login__button" onClick={handleExistingSubmit}>Go</button>
      </div>
    </div>
  );
};
