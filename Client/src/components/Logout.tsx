import React, { useState, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Logout.css';

export const Logout: React.FC = () => {

  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget.textContent;
    if (button === 'No') {
      return navigate('user');
    }
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="login__main">
      <p>Are you sure you want to log out?</p>
      <button type='submit' className="main__button" onClick={handleSubmit}>Yes</button>
      <button type='submit' className="main__button" onClick={handleSubmit}>No</button>
    </div>
  );
};