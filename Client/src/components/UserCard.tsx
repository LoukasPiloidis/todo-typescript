import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { AddItemForm } from "./AddItemForm";
import { ItemList } from "./ItemList";
import '../styles/UserCard.css';

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:4000';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);

interface UserCardProps {
  getUser: GetUser;
};

export const UserCard: React.FC<UserCardProps> = ({ getUser }) => {
  const [items, setItems] = useState<Array<Item>>([]);

  const id: string | null = localStorage.getItem('user');

  socket.on("items", (itemList: Array<Item>) => setItems(itemList));

  const toggleComplete = (e: React.MouseEvent<HTMLDivElement>) => {
      const selectedItem = items.filter(todo => todo.title === e.currentTarget.id)[0];
      return socket.emit('changeStatus', selectedItem);
  };

  const toggleCompleteDaily = (e: React.MouseEvent<HTMLDivElement>, parentItem: string) => {
    const initialItem = items.filter(todo => todo.title === parentItem)[0];
    const itemToSend = initialItem.daily.filter((todo: dailyItem) => todo.title === e.currentTarget.id)[0];
    const selectedItem = { title: itemToSend.title, desc: itemToSend.desc, complete: itemToSend.complete, id: initialItem.id};
    socket.emit('changeDailyStatus', { parentItem, selectedItem } );
  };

  const toggleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedItem: object = { title: e.currentTarget.id, id };
    socket.emit('removeItem', selectedItem);
  };

  const addItem = (title: string, desc: string) => {
    socket.emit('addItem', {title, desc, id});
  };

  const handleToggleButton = (e: React.MouseEvent<HTMLParagraphElement>) => {
    if (e.currentTarget.textContent === 'Completed') {
      socket.emit("filterCompleted", id);
      socket.on('returnFilteredData', (filteredData: any) => {
        setItems(filteredData);
      });
    };
    if (e.currentTarget.textContent === 'Pending') {
      socket.emit("filterPending", id);
      socket.on('returnFilteredData', (filteredData: any) => {
        setItems(filteredData);
      });
    };
    if (e.currentTarget.textContent === 'Reset') {
      socket.emit("filterReset", id);
    };
  };

  const addListItem = (value: object | undefined) => socket.emit('addListItem', value);

  const addFinanceItem = (value: object | undefined) => socket.emit('addFinanceItem', value);

  const addDailyItem = (value: object | undefined) => socket.emit('addDailyItem', value);

  useEffect(() => {
    getUser(id);
    socket.emit('getItems', id);
  }, []);
  
  return (
    <div>
      <AddItemForm addItem={addItem} items={items} />
      <div className="container-filter">
        <p className="filter-button" onClick={handleToggleButton} >Completed</p>
        <p className="filter-button" onClick={handleToggleButton} >Pending</p>
        <p className="filter-button" onClick={handleToggleButton} >Reset</p>
      </div>
      <ItemList items={items} toggleComplete={toggleComplete} toggleRemove={toggleRemove} addListItem={addListItem} addFinanceItem={addFinanceItem} addDailyItem={addDailyItem} toggleCompleteDaily={toggleCompleteDaily} />
    </div>
  );
};