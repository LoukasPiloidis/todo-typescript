import React, { useState, ChangeEvent, FormEvent } from "react";
import '../styles/AddItemForm.css';

interface AddItemFormProps {
  addItem: AddItem;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ addItem }) => {
  const [newItem, setNewItem] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItem(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addItem(newItem);
    setNewItem('');
  };

  return (
    <form className="add-form" >
      <input type="text" value={newItem} placeholder="Please provide title" className="form__title" onChange={handleChange} />
      <button type="submit" className="form__add-btn" onClick={handleSubmit}>
        Add
      </button>
    </form>
  );
};
