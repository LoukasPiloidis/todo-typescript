import React, { useEffect, useState } from "react";
import { Item } from "./Item";
import { RadioList } from './RadioList'
import '../styles/ItemList.css';
import { RadioFinance } from "./RadioFinance";
import { RadioDaily } from "./RadioDaily";

interface ItemListProps {
  items: Array<Item>;
  toggleComplete: ToggleComplete;
  toggleRemove: ToggleRemove;
  addListItem: AddListItem;
  addFinanceItem: AddFinanceItem;
  addDailyItem: AddDailyItem;
  toggleCompleteDaily: ToggleCompleteDaily;
  toggleCompleteList: ToggleCompleteList;
}

export const ItemList: React.FC<ItemListProps> = ({ items, toggleComplete, toggleRemove, addListItem, addFinanceItem, addDailyItem, toggleCompleteDaily, toggleCompleteList }) => {
  const [editedItem, setEditedItem] = useState<Item>();
  const [listValue, setListValue] = useState<string>('');

  const toggleEdit: ToggleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const itemToEdit = items.filter(item => item.title === e.currentTarget.id)[0];
    setEditedItem(itemToEdit);
  };

  const handleClose = () => setEditedItem(undefined);

  const handleValue = (e: React.MouseEvent<HTMLInputElement>) => setListValue(e.currentTarget.value);

  useEffect(() => {
    const updateItem: Item = items.filter(el => editedItem && el.title === editedItem.title)[0];
    setEditedItem(updateItem);
  }, [items]);
  

  return (
    <div className='main'>
      <ul className='items-container'>
        {items.map(item => (
          <Item key={item.title} item={item} toggleComplete={toggleComplete} toggleEdit={toggleEdit} toggleRemove={toggleRemove} />
        ))}
      </ul>
      {editedItem && <div className="items__extra" >
        <div className={`items__edited-main ${listValue}`}>
          <div className="button-container"><button className='close-btn' onClick={handleClose}>X</button></div>
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
          <h2>{editedItem.title}</h2>
          <p>{editedItem.desc}</p>
          {listValue === 'list' && <RadioList item={editedItem} addListItem={addListItem} toggleCompleteList={toggleCompleteList} />}
          {listValue === 'finance' && <RadioFinance item={editedItem} addFinanceItem={addFinanceItem} />}
          {listValue === 'daily' && <RadioDaily item={editedItem} addDailyItem={addDailyItem} toggleCompleteDaily={toggleCompleteDaily} />}
        </div>
      </div>}
    </div>
  );
};
