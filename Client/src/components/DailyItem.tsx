import React from "react";
import '../styles/DailyItem.css';

interface DailyItemProps {
  item: Item;
  parentItem: string;
  toggleCompleteDaily: ToggleCompleteDaily;
};

export const DailyItem: React.FC<DailyItemProps> = ({ item, parentItem, toggleCompleteDaily }) => {

  const handleComplete = (e: React.MouseEvent<HTMLDivElement>) => toggleCompleteDaily(e, parentItem);
  
  return (
    <li className={`item-main ${item.complete ? "complete" : ''}`}>
      <div id={item.title} onClick={handleComplete}>
        <h2>
          {item.title}
        </h2>
        <p>{item.desc}</p>
      </div>
    </li>
  );
};
