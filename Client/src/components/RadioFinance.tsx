import React, { useState, ChangeEvent, useEffect } from "react";
import '../styles/RadioFinance.css';


interface RadioFinanceProps {
  item: Item;
  addFinanceItem: AddFinanceItem;
};

export const RadioFinance: React.FC<RadioFinanceProps> = ({ item, addFinanceItem }) => {
  
  const [items, setItems] = useState<Array<financeItem | undefined>>(item.finance);
  const [title, setItemElement] = useState<string>();
  const [price, setPriceElement] = useState<string>();
  const [required, setRequired] = useState<string | undefined>();

  const addNewItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!price || !title) {
      return setRequired('All fields are required');
    };
    if (Number.isNaN(parseInt(price))) {
      return setRequired('Price must be a valid number');
    }; 
    addFinanceItem({ title: e.currentTarget.id, item: { title, price }, id: item.id }); 
  };

  const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => setItemElement(e.currentTarget.value);

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => setPriceElement(e.currentTarget.value);

  useEffect(() => {
    setItems(item.finance);
  }, [item]);

  useEffect(() => {
    setTimeout(() => setRequired(undefined), 2000);
  }, [required]);
  
  return (
    <div className="radio-finance-item">
      <form className='form-add-item'>
        <input type='text' className='add-item-text' placeholder='Add item' onChange={handleItemChange}></input>
        <input type='text' className='add-item-text' placeholder='Add price' onChange={handlePriceChange}></input>
        <button className='add-item-btn' onClick={addNewItem} id={item.title}>+</button>
      </form>
      <p>{required}</p>
      <ul>
      {items.map((el => <li key={el?.title} className="list-item">
          <p>{el?.title}</p>
          <p>{el?.price}:-</p>
        </li>))}
      </ul>
    </div>
  );
};
