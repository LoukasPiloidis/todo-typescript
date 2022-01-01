import React, { useState, ChangeEvent } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Welcome.css';

// interface WelcomeProps {
//   // item: Item;
//   // toggleComplete: ToggleComplete;
//   // toggleEdit: ToggleEdit;
//   // toggleRemove: ToggleRemove;
// }

export const Welcome: React.FC = () => {
  const [url, setUrl] = useState<string>('');

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setUrl(e.currentTarget.value);

  const handleExistingSubmit = () => {
    setUrl('');
    navigate(url);
  };

  const handleNewSubmit = () => {
    const id = Date.now().toString();
    navigate(id);
  }

  return (
    <div className="welcome__main">
      <label className="main__title">Join an existing project</label>
      <input type='text' className="main__input" placeholder="enter your project name" onChange={handleChange}></input>
      <button type='submit' className="main__button" onClick={handleExistingSubmit}>Go</button>
      <label className="main__title">Create a new project</label>
      <input type='text' className="main__input" placeholder="name your project" onChange={handleChange}></input>
      <button type='submit' className="main__button" onClick={handleNewSubmit}>Create</button>
    </div>
  );
};
