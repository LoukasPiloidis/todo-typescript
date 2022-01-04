import React, { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Logout.css';

interface LogoutProps {
  getUser: GetUser;
};

export const Logout: React.FC<LogoutProps> = ({ getUser }) => {

  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget.textContent;
    if (button === 'No') {
      return navigate('user');
    }
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    getUser(localStorage.getItem('user'));
  }, [])

  return (
    <div className="login__main">
      <p>Are you sure you want to log out?</p>
      <button className="main__button" onClick={handleSubmit}>Yes</button>
      <button className="main__button"><a href={`${localStorage.getItem('user')}`}>No</a></button>
    </div>
  );
};