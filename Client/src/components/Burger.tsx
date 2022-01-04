import React, { useEffect, useState } from 'react';
import { BurgerItem } from './BurgerItem';
import '../styles/Burger.css';

const Burger: React.FC = () => {
  const [isMounted, setMounted] = useState<boolean>(false);
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);
  const [burgerOpen, setBurgerOpen] = useState<boolean>(false);
  const [items, setItems] = useState<Array<burgerItem>>([]);

  const toggleBurger = () =>{
    setMounted(true);
    setBurgerOpen(!burgerOpen);
    setDisplayMenu(!displayMenu);
  };

  // const fetchGenres = async () => {
  //   // const urlDev = 'http://localhost:4123';
  //   const url = 'https://gamehub-gameserver.herokuapp.com';

  //   const data = await axios.get(`${url}/api/genres`);
  //   setGenres(data.data);
  // };

  // useEffect(() => {
  //   fetchGenres();
  // }, [])

  const handleLogin = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return setItems([{name: 'Home', url: '/'}, {name: 'Items', url: `${user}`}, {name: 'About', url: 'about'} , {name: 'Github', url: 'https://github.com/LoukasPiloidis/todo-typescript'}, {name: 'Log Out', url: 'logout' }]);
    }
    setItems([{name: 'Home', url: '/'}, {name: 'About', url: 'about'} , {name: 'Github', url: 'https://github.com/LoukasPiloidis/todo-typescript'}]);
  };

  useEffect(() => {
    handleLogin();
  }, [])

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
          {/* {genres.map(genre => <p>key={genre} </p> )} */}
        </ul>
      </div>
    </div>
  );
};

export default Burger;