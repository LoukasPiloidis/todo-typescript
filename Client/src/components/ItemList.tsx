import React from "react";
import { Item } from "./Item";

interface ItemListProps {
  items: Array<Item>;
  toggleComplete: ToggleComplete;
}

export const ItemList: React.FC<ItemListProps> = ({
  items,
  toggleComplete
}) => {
  return (
    <ul>
      {items.map(item => (
        <Item key={item.text} item={item} toggleComplete={toggleComplete} />
      ))}
    </ul>
  );
};