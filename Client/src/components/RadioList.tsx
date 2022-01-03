import React, { useState, ChangeEvent } from "react";
import '../styles/RadioList.css';


interface RadioListProps {
  item: Item;
};

export const RadioList: React.FC<RadioListProps> = ({ item }) => {
  const [items, setItems] = useState<Array<string | undefined>>([]);
  const [element, setElement] = useState<string>();

  const addNewItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItems([...items, element]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setElement(e.currentTarget.value);
  
  return (
    <div className="radio-list-item">
      {item && <h2>{item.title}</h2>}
      {item && <p>{item.desc}</p>}
      <form className='form-add-item'>
        <input type='text' className='add-item-text' placeholder='Add an Item' onChange={handleChange}></input>
        <button className='add-item-btn' onClick={addNewItem}>+</button>
      </form>
      {items.map(itm => <li key={Math.random().toString()}>{itm}</li>)}
      <button type='submit' className='edit-info-btn'>Edit Info</button>
    </div>
  );
};