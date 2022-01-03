import React, { useState } from "react";
import { Item } from "./Item";
import { RadioList } from './RadioList'
import '../styles/ItemList.css';

interface ItemListProps {
  items: Array<Item>;
  toggleComplete: ToggleComplete;
  toggleRemove: ToggleRemove;
}

export const ItemList: React.FC<ItemListProps> = ({ items, toggleComplete, toggleRemove }) => {
  const [editedItem, setEditedItem] = useState<Item>();
  const [listValue, setListValue] = useState<string>('');

  const toggleEdit: ToggleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const itemToEdit = items.filter(item => item.title === e.currentTarget.id)[0];
    setEditedItem(itemToEdit);
  };

  const handleClose = () => setEditedItem(undefined);

  const handleValue = (e: React.MouseEvent<HTMLInputElement>) => setListValue(e.currentTarget.value);

  return (
    <div className='main'>
      <ul className='items-container'>
        {items.map(item => (
          <Item key={item.title} item={item} toggleComplete={toggleComplete} toggleEdit={toggleEdit} toggleRemove={toggleRemove} />
        ))}
      </ul>
      {editedItem && <div className="items__extra" >
        <div className={`items__edited-main ${listValue}`}>
          <form className='form-checkbox'>
            <div className='form__div'>
              <input type='radio' name='list-selection' value='list' id="list" onClick={handleValue}></input>
              <label htmlFor='list'>List</label>
            </div>
            <div className='form__div'>
              <input type='radio' name='list-selection' value='finance' onClick={handleValue}></input>
              <label>Finance</label>
            </div>
            <div className='form__div'>
              <input type='radio' name='list-selection' value='daily' onClick={handleValue}></input>
              <label>Daily</label>
            </div>
          </form>
          <RadioList item={editedItem}/>
        </div>
        <p className="close-btn" onClick={handleClose}>X</p>
      </div>}
    </div>
  );
};