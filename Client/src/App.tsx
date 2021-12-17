import React, { useState } from "react";
import { AddItemForm } from "./components/AddItemForm";
import { ItemList } from "./components/ItemList";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:4000';


// const initialItems: Array<Item> = [
//   {text: 'walk the dog', complete: true, subItems: {text: 'text2', complete: false}},
//   {text: 'write app', complete: false}
// ];

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);

const App = () => {
  const [items, setItems] = useState([]);

  socket.on("items", (item: any) => {
  setItems(item);
  });

  // const toggleComplete: ToggleComplete = selectedItem => {
  //   const newItems = items.map(item => item === selectedItem ? {...item, complete: !item.complete} : item);
  //   setItems(newItems);
  // };

  // const addItem: AddItem = newItem => {
  //   newItem.trim() !== '' && setItems([...items, {text: newItem, complete: false }])
  // }

  return(
    <React.Fragment>
      <ItemList items={items} />
      <AddItemForm />
    </React.Fragment>
  ) 
}

export default App;
