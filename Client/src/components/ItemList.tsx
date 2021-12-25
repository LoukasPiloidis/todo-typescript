import React, { useState } from "react";
import { Item } from "./Item";
import '../styles/ItemList.css';

interface ItemListProps {
  items: Array<Item>;
  toggleComplete: ToggleComplete;
  toggleRemove: ToggleRemove;
}

export const ItemList: React.FC<ItemListProps> = ({ items, toggleComplete, toggleRemove }) => {
  const [editedItem, setEditedItem] = useState<Item>();

  const toggleEdit: ToggleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const itemToEdit = items.filter(item => item.title === e.currentTarget.id)[0];
    setEditedItem(itemToEdit);
    
  }
  return (
    <div className='main'>
      <ul className='items-container'>
        {items.map(item => (
          <Item key={item.title} item={item} toggleComplete={toggleComplete} toggleEdit={toggleEdit} toggleRemove={toggleRemove} />
        ))}
      </ul>
      {editedItem && <div className='items__edited-main'>
        <form className='form-checkbox'>
          <div className='form__div'>
            <input type='checkbox' value='list'></input>
            <label>List</label>
          </div>
          <div className='form__div'>
            <input type='checkbox' value='finance'></input>
            <label>Finance</label>
          </div>
          <div className='form__div'>
            <input type='checkbox' value='daily'></input>
            <label>Daily</label>
          </div>
        </form>
        {editedItem && <h2>{editedItem.title}</h2>}
        {editedItem && <p>{editedItem.desc}</p>}
        <form className='form-add-item'>
          <input type='text' className='add-item-text' placeholder='Add an Item'></input>
          <button type='submit' className='add-item-btn'>+</button>
        </form>
        <button type='submit' className='edit-info-btn'>Edit Info</button>
      </div>}
    </div>
  );
};