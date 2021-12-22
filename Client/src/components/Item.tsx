import React from "react";
import '../styles/Item.css';

interface ItemProps {
  item: Item;
  toggleComplete: ToggleComplete;
}

export const Item: React.FC<ItemProps> = ({ item, toggleComplete }) => {
  return (
    <li className={`item-main ${item.complete ? "complete" : ''}`}>
      <h2 onClick={toggleComplete}>
        {item.title}
      </h2>
      <p>{item.desc}</p>
      <button type='submit' className='edit-btn'>Edit</button>
    </li>
  );
};