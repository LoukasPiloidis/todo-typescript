import React, { useState, ChangeEvent, useEffect } from "react";
import '../styles/RadioList.css';

interface RadioListProps {
  item: Item;
  addListItem: AddListItem;
  toggleCompleteList: ToggleCompleteList;
};

export const RadioList: React.FC<RadioListProps> = ({ item, addListItem, toggleCompleteList }) => {
  const [items, setItems] = useState<Array<listItem | undefined>>(item.list);
  const [element, setElement] = useState<string>();

  const addNewItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const fullElement = { element, complete: false}
    addListItem({ title: e.currentTarget.id, fullElement, id: item.id, complete: false });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setElement(e.currentTarget.value);

  const handleComplete = (e: React.MouseEvent<HTMLLIElement>) => toggleCompleteList(e, item.title);

  useEffect(() => {
    setItems(item.list);
  }, [item]);
  
  return (
    <div className="radio-list-item">
      <form className='form-add-item'>
        <input type='text' className='add-item-text' placeholder='Add an Item' onChange={handleChange}></input>
        <button className='add-item-btn' onClick={addNewItem} id={item.title}>+</button>
      </form>
      <ul>
        {items.map((el => <li className={`${el?.complete ? "completed" : ''}`} key={Math.random().toString()} onClick={handleComplete} >{el?.element}</li>))}
      </ul>
    </div>
  );
};
