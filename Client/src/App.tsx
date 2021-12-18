import React, { useState } from "react";
import { AddItemForm } from "./components/AddItemForm";
import { ItemList } from "./components/ItemList";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:4000';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);

const App = () => {
  const [items, setItems] = useState<Array<Item>>([]);

  socket.on("items", (itemList: Array<Item>) => {
    setItems(itemList);
  });

  const toggleComplete = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const selectedItem: string | null = e.currentTarget.textContent;
    socket.emit('changeStatus', selectedItem);
  };

  const addItem = (newItem: string) => {
    socket.emit('addItem', newItem);
    
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
        <button type="submit" onClick={handleToggleButton} >Completed</button>
        <button type="submit" onClick={handleToggleButton} >Pending</button>
        <ItemList items={items} toggleComplete={toggleComplete} />
        <AddItemForm addItem={addItem} />
      </>
    </React.Fragment>
  ) 
}

export default App;
