import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router";
import { AddItemForm } from "./AddItemForm";
import { ItemList } from "./ItemList";
import '../styles/UserCard.css';

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:4000';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);

export const UserCard: React.FC = () => {
  const [items, setItems] = useState<Array<Item>>([]);

  const { id } = useParams();

  socket.on("items", (itemList: Array<Item>) => setItems(itemList));

  const toggleComplete = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedItem = items.filter(todo => todo.title === e.currentTarget.id)[0];
    socket.emit('changeStatus', selectedItem);
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
  };

  useEffect(() => {
    socket.emit('getItems', id);
  }, []);

  return (
    <div>
      <AddItemForm addItem={addItem} />
      <div className="container-filter">
        <p className="filter-button" onClick={handleToggleButton} >Completed</p>
        <p className="filter-button" onClick={handleToggleButton} >Pending</p>
        <p className="filter-button" onClick={handleToggleButton} >Reset</p>
      </div>
      <ItemList items={items} toggleComplete={toggleComplete} toggleRemove={toggleRemove} />
    </div>
  );
};