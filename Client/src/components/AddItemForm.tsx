import React, { useState, ChangeEvent, FormEvent } from "react";

interface AddItemFormProps {
  // addItem: AddItem;
}

export const AddItemForm: React.FC<AddItemFormProps> = () => {
  const [newItem, setNewItem] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItem(e.target.value);
  };

  // const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   addItem(newItem);
  //   setNewItem('');
  // };

  return (
    <form>
      <input type="text" value={newItem} onChange={handleChange} />
      <button type="submit" >
        Add Todo
      </button>
    </form>
  );
};
