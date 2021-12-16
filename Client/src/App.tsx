import React, { useState } from "react";
import { AddItemForm } from "./components/AddItemForm";
import { ItemList } from "./components/ItemList";

const initialItems: Array<Item> = [
  {text: 'walk the dog', complete: true, subItems: {text: 'text2', complete: false}},
  {text: 'write app', complete: false}
];

const App = () => {
  const [items, setItems] = useState(initialItems);

  const toggleComplete: ToggleComplete = selectedItem => {
    const newItems = items.map(item => item === selectedItem ? {...item, complete: !item.complete} : item);
    setItems(newItems);
  };

  const addItem: AddItem = newItem => {
    newItem.trim() !== '' && setItems([...items, {text: newItem, complete: false }])
  }

  return(
    <React.Fragment>
      <ItemList items={items} toggleComplete={toggleComplete} />
      <AddItemForm addItem={addItem} />
    </React.Fragment>
  ) 
}

export default App;
