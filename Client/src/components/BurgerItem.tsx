import React from 'react';
import '../styles/BurgerItem.css';

interface BurgerItemProps {
  item: burgerItem;
};

export const BurgerItem: React.FC<BurgerItemProps> = ({ item }) => {
  
  return (
    <li className="genre-list">
      <a href={item.url} className="genre-list__info">{item.name}</a>
    </li>
  );
};
