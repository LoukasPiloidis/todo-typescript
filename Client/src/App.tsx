import React, { useState } from "react";
import { AddItemForm } from "./components/AddItemForm";
import { ItemList } from "./components/ItemList";
import { io, Socket } from "socket.io-client";
import './styles/App.css';

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:4000';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);
const userSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:4000/loukas');

const App = () => {
  const [items, setItems] = useState<Array<Item>>([]);

  socket.on("items", (itemList: Array<Item>) => {
    setItems(itemList);
  });

  const toggleComplete = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedItem = items.filter(todo => todo.title === e.currentTarget.id)[0];
    socket.emit('changeStatus', selectedItem);
  };

  const toggleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedItem: string | null = e.currentTarget.id;
    socket.emit('removeItem', selectedItem);
  };

  const addItem = (title: string, desc: string) => {
    socket.emit('addItem', {title, desc});
    
    // newItem.trim() !== '' && setItems([...items, {text: newItem, complete: false }])
  };

  const handleToggleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent === 'Completed') {
      socket.emit("filterCompleted");
      socket.on('returnFilteredData', (filteredData: any) => {
        setItems(filteredData);
      });
    };
    if (e.currentTarget.textContent === 'Pending') {
      socket.emit("filterPending");
      socket.on('returnFilteredData', (filteredData: any) => {
        setItems(filteredData);
      });
    };
  };

  return(
    <React.Fragment>
      <>
        <h1>Todo app on Steroids</h1>
        <button type="submit" onClick={handleToggleButton} >Completed</button>
        <button type="submit" onClick={handleToggleButton} >Pending</button>
        <AddItemForm addItem={addItem} />
        <ItemList items={items} toggleComplete={toggleComplete} toggleRemove={toggleRemove} />
      </>
    </React.Fragment>
  ) 
}

export default App;
