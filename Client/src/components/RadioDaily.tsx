import React, { useState, ChangeEvent, useEffect } from "react";
import { DailyItem } from './DailyItem';
import '../styles/RadioDaily.css';


interface RadioDailyProps {
  item: Item;
  addDailyItem: AddDailyItem;
  toggleCompleteDaily: ToggleCompleteDaily;
};

export const RadioDaily: React.FC<RadioDailyProps> = ({ item, addDailyItem, toggleCompleteDaily }) => {
  const [items, setItems] = useState<Array<Item>>(item.list);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [error, setError] = useState<string | undefined>();

  const addNewItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const identical = items.filter(item => item.title === title);
    if (identical.length > 0) {
      return setError('this title is not unique');
    };
    if (title.length < 1 || desc.length < 1) {
      return setError('all fields are required');
    };
    addDailyItem({ title: e.currentTarget.id, item: {title, desc, complete: false}, id: item.id });
  };

  const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

  const handleDescChange = (e: ChangeEvent<HTMLInputElement>) => setDesc(e.currentTarget.value);

  useEffect(() => {
    setItems(item.daily);
  }, [item]);
  
  return (
    <div className="radio-daily-item">
      <form className='form-add-item'>
        <input type='text' className='add-item-text' placeholder='Add item' onChange={handleItemChange}></input>
        <input type='text' className='add-item-text' placeholder='Add description' onChange={handleDescChange}></input>
        <button className='add-item-btn' onClick={addNewItem} id={item.title}>+</button>
      </form>
      <p>{error}</p>
      <div className="item-list">
        {items && items.map((el => el && 
          <DailyItem key={Math.random().toString()} item={el} parentItem={item.title} toggleCompleteDaily={toggleCompleteDaily} />))}
      </div>
    </div>
  );
};