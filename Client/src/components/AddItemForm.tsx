import React, { useState, ChangeEvent, FormEvent } from "react";
import '../styles/AddItemForm.css';

interface AddItemFormProps {
  addItem: AddItem;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ addItem }) => {
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDesc, setNewDesc] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.currentTarget.id === 'title') {
      setNewTitle(e.currentTarget.value);
    };
    if(e.currentTarget.id === 'desc') {
      setNewDesc(e.currentTarget.value);
    };
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addItem(newTitle, newDesc);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <form className="add-form" >
      <input type="text" value={newTitle} id="title" placeholder="Please provide title" className="form__title" onChange={handleChange} />
      <input type="text" value={newDesc} id="desc" placeholder="Please provide description" className="form__title" onChange={handleChange} />
      <button type="submit" className="form__add-btn" onClick={handleSubmit}>
        Add
      </button>
    </form>
  );
};
