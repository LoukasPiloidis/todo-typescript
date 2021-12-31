import React, { useState, ChangeEvent } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Welcome.css';

interface WelcomeProps {
  // item: Item;
  // toggleComplete: ToggleComplete;
  // toggleEdit: ToggleEdit;
  // toggleRemove: ToggleRemove;
}

export const Welcome: React.FC<WelcomeProps> = () => {
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
    <div>
      <label>Join an existing project</label>
      <input type='text' placeholder="copy/paste your id" onChange={handleChange}></input>
      <button type='submit' onClick={handleExistingSubmit}>Go</button>
      <button type='submit' onClick={handleNewSubmit}>Create New Project</button>
    </div>
  );
};
