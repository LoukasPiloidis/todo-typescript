import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BurgerItem.css';

interface BurgerItemProps {
  item: burgerItem;
};

export const BurgerItem: React.FC<BurgerItemProps> = ({ item }) => {

  const navigate = useNavigate();

  // const handleClick = async e => {
  //   e.preventDefault();
  //   const games = await getData();
  //   dispatch(
  //     setSearchResults(games)
  //   );
  //   navigate(`/category/${genre.name}`);
  //   clickEvent();
  // }
  
  return (
    <li className="genre-list">
        <a href={item.url} className="genre-list__info">{item.name}</a>
    </li>
  );
};

export default BurgerItem;