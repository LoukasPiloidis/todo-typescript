import React, { useState } from "react";
import { Item } from "./Item";
import '../styles/ItemList.css';

interface ItemListProps {
  items: Array<Item>;
  toggleComplete: ToggleComplete;
}

export const ItemList: React.FC<ItemListProps> = ({ items, toggleComplete }) => {
  const [editedItem, setEditedItem] = useState<Item>({title: 'SuperMarket List', complete: false, desc: 'Our collaborative supermarket list for the whole family to contribute.'});

  const toggleEdit: ToggleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const itemToEdit = items.filter(item => item.title === e.currentTarget.id)[0];
    setEditedItem(itemToEdit);
    
  }
  return (
    <div className='main'>
      <ul className='items-container'>
        {items.map(item => (
          <Item key={item.title} item={item} toggleComplete={toggleComplete} toggleEdit={toggleEdit} />
        ))}
      </ul>
      <div className='items__edited-main'>
        <form>
          <input type='checkbox' value='list'></input>
          <label>List</label>
        </form>
        <h2>{editedItem.title}</h2>
        <p>{editedItem.desc}</p>
      </div>
    </div>
  );
};