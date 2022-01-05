import React, { useEffect, useState } from 'react';
import { BurgerItem } from './BurgerItem';
import '../styles/Burger.css';

interface BurgerProps {
  user: string | null;
};

const Burger: React.FC<BurgerProps> = ({ user }) => {
  const [isMounted, setMounted] = useState<boolean>(false);
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);
  const [burgerOpen, setBurgerOpen] = useState<boolean>(false);
  const [items, setItems] = useState<Array<burgerItem>>([]);  

  const toggleBurger = () =>{
    setMounted(true);
    setBurgerOpen(!burgerOpen);
    setDisplayMenu(!displayMenu);
  };

  const handleLogin = () => {
    if (user) {
      return setItems([{name: 'Home', url: '/'}, {name: 'Items', url: `${user}`}, {name: 'About', url: 'about'} , {name: 'Github', url: 'https://github.com/LoukasPiloidis/todo-typescript'}, {name: 'Log Out', url: 'logout' }]);
    }
    setItems([{name: 'Home', url: '/'}, {name: 'About', url: 'about'} , {name: 'Github', url: 'https://github.com/LoukasPiloidis/todo-typescript'}]);
  };

  useEffect(() => {
    handleLogin();
  }, [user]);

  return (
    <div className="page-header__burger">
      <div className="burger__burger-icon" onClick={toggleBurger}>
        <div className={`burger-icon__button ${isMounted && `${burgerOpen ? "active" : "not-active"}`}`} >
          <span className="button__line"></span>
          <span className="button__line"></span>
          <span className="button__line"></span>
        </div>
      </div>
      <div className={`burger__menu ${!isMounted && "hidden"} ${displayMenu ? "show" : "hide"}`}>
        <ul className="menu__list">
          {items.map(item => <BurgerItem key={item.name} item={item} />)}
        </ul>
      </div>
    </div>
  );
};

export default Burger;