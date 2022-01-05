import React from "react";
import '../styles/Item.css';

interface ItemProps {
  item: Item;
  toggleComplete: ToggleComplete;
  toggleEdit: ToggleEdit;
  toggleRemove: ToggleRemove;
}

export const Item: React.FC<ItemProps> = ({ item, toggleComplete, toggleEdit, toggleRemove }) => {

  const getSum = () => {
    let sum = 0;
    item.finance.forEach((title: any) => sum += parseInt(title.price));
    return sum;
  };

  return (
    <li className={`item-main ${item.complete ? "complete" : ''}`}>
      <div onClick={toggleComplete} id={item.title}>
        <h2 className="item__title">
          {item.title}
        </h2>
        <p className="item__desc">{item.desc}</p>
      </div>
      <div className='item-btn-container'>
        <button type='submit' className='edit-btn' id={item.title} onClick={toggleEdit}>Show More</button>
        <button type='submit' className='remove-btn' id={item.title} onClick={toggleRemove}>Delete</button>
      </div>
      {item.finance && item.finance.length > 0 && <p>SUM: {getSum()}:-</p>}
    </li>
  );
};