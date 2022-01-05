import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Logout.css';

interface LogoutProps {
  getUser: GetUser;
};

export const Logout: React.FC<LogoutProps> = ({ getUser }) => {
  const [user, setUser] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget.textContent;
    if (button === 'No') {
      return navigate(`/${user}`);;
    }
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    setUser(localStorage.getItem('user'));
    getUser(user);
  }, [])

  return (
    <div className="logout__main">
      <h2 className="logout__prompt">Are you sure you want to log out?</h2>
      <div className="logout-buttons">
        <button className="logout__button" onClick={handleSubmit}>Yes</button>
        <button className="logout__button" onClick={handleSubmit}>No</button>
      </div>
    </div>
  );
};