import React from "react";

interface ItemProps {
  item: Item;
  // toggleComplete: ToggleComplete;
}

export const Item: React.FC<ItemProps> = ({
  item,
  // toggleComplete
}) => {
  return (
    <li>
      <label className={item.complete ? "complete" : undefined}>
        {item.text}
      </label>
    </li>
  );
};