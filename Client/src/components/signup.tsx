import React, { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { createUser } from "../config";
import '../styles/Signup.css';

export const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassname] = useState<string>('');
  const [password2, setPass2name] = useState<string>('');
  const [loginFail, setLoginFail] = useState<string | undefined>();

  const navigate = useNavigate();

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);
  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => setPassname(e.currentTarget.value);
  const handlePass2Change = (e: ChangeEvent<HTMLInputElement>) => setPass2name(e.currentTarget.value);

  const handleNavigate = (user: loginInfo | null) => {
    if (!user) { return setLoginFail('login failed') };
    if (user.username === 'This user already exists') { return setLoginFail(user.username)}
    if (user) { 
      localStorage.setItem('user', user.username);
      return navigate(user.username);
    }; 
  };
  
  const handleNewSubmit = () => password === password2 ? createUser(username, password, handleNavigate) : setLoginFail('passwords do not match');

  useEffect(() => {
    setTimeout(() => setLoginFail(undefined), 2000);
  }, [loginFail]);

  return (
    <div className="signup__main">
      <label className="main__title">Sign Up</label>
      <input type='text' className="main__input" placeholder="enter a username" onChange={handleUserChange}></input>
      <input type='password' className="main__input" placeholder="enter a password" onChange={handlePassChange}></input>
      <input type='password' className="main__input" placeholder="reenter a password" onChange={handlePass2Change}></input>
      <p>{loginFail}</p>
      <button type='submit' className="signup__button" onClick={handleNewSubmit}>Create</button>
    </div>
  );
};