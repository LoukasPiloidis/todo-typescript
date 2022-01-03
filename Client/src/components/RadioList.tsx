import React, { useState, ChangeEvent, useEffect } from "react";
import '../styles/RadioList.css';


interface RadioListProps {
  item: Item;
  addListItem: AddListItem;
};

export const RadioList: React.FC<RadioListProps> = ({ item, addListItem }) => {
  
  const [items, setItems] = useState<Array<string | undefined>>(item.list);
  const [element, setElement] = useState<string>();

  const addNewItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addListItem({ title: e.currentTarget.id, element, id: item.id });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setElement(e.currentTarget.value);

  useEffect(() => {
    setItems(item.list);
  }, [item]);
  
  return (
    <div className="radio-list-item">
      <form className='form-add-item'>
        <input type='text' className='add-item-text' placeholder='Add an Item' onChange={handleChange}></input>
        <button className='add-item-btn' onClick={addNewItem} id={item.title}>+</button>
      </form>
      {items.map((el => <li key={Math.random().toString()}>{el}</li>))}
      <button type='submit' className='edit-info-btn'>Edit Info</button>
    </div>
  );
};