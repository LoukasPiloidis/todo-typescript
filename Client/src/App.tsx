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

  const toggleComplete = (clickedItem: any) => {
    const selectedItem: string = clickedItem.target.textContent
    socket.emit('changeStatus', selectedItem);
    
    // const newItems = items.map(item => item === selectedItem ? {...item, complete: !item.complete} : item);
    // setItems(newItems);
  };

  const addItem = (newItem: string) => {
    socket.emit('addItem', newItem);
    
    // newItem.trim() !== '' && setItems([...items, {text: newItem, complete: false }])
  }

  return(
    <React.Fragment>
      <ItemList items={items} toggleComplete={toggleComplete} />
      <AddItemForm addItem={addItem} />
    </React.Fragment>
  ) 
}

export default App;
