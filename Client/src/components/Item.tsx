import React from "react";
import '../styles/Item.css';

interface ItemProps {
  item: Item;
  toggleComplete: ToggleComplete;
}

export const Item: React.FC<ItemProps> = ({ item, toggleComplete }) => {
  return (
    <li>
      <h2 className={item.complete ? "complete" : undefined} onClick={toggleComplete}>
        {item.title}
      </h2>
      <p>{item.desc}</p>
    </li>
  );
};