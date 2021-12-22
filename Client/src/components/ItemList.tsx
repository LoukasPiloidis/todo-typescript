import React from "react";
import { Item } from "./Item";
import '../styles/ItemList.css';

interface ItemListProps {
  items: Array<Item>;
  toggleComplete: ToggleComplete;
}

export const ItemList: React.FC<ItemListProps> = ({ items, toggleComplete }) => {
  return (
    <ul className='items-container'>
      {items.map(item => (
        <Item key={item.title} item={item} toggleComplete={toggleComplete} />
      ))}
    </ul>
  );
};