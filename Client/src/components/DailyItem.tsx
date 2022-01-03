import React from "react";
import '../styles/DailyItem.css';

interface DailyItemProps {
  item: Item;
}

export const DailyItem: React.FC<DailyItemProps> = ({ item }) => {

  return (
    <li className={`item-main ${item.complete ? "complete" : ''}`}>
      <div id={item.title}>
        <h2>
          {item.title}
        </h2>
        <p>{item.desc}</p>
      </div>
    </li>
  );
};