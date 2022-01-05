import React, { useEffect } from "react";
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
    <div className="logout__main">
      <h2 className="logout__prompt">Are you sure you want to log out?</h2>
      <div className="logout-buttons">
        <button className="logout__button" onClick={handleSubmit}>Yes</button>
        <form className="logout__form" action={`https://todo-loukas.herokuapp.com/${localStorage.getItem('user')}`}>
          <input type='submit' className="logout__button input" value='No' />
        </form>
      </div>
    </div>
  );
};