import React from "react";
import '../styles/Item.css';

interface ItemProps {
  item: Item;
  toggleComplete: ToggleComplete;
}

export const Item: React.FC<ItemProps> = ({ item, toggleComplete }) => {
  return (
    <li>
      <p className={item.complete ? "complete" : undefined} onClick={toggleComplete}>
        {item.text}
      </p>
    </li>
  );
};