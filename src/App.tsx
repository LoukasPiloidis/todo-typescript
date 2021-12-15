import React, { useState } from "react";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";

const initialTodos: Array<Todo> = [
  {text: 'walk the dog', complete: true},
  {text: 'write app', complete: false}
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo: ToggleTodo = selectedTodo => {
    const newTodos = todos.map(todo => todo === selectedTodo ? {...todo, complete: !todo.complete} : todo);
    setTodos(newTodos);
  };

  const addItem: AddItem = newItem => {
    newItem.trim() !== '' && setTodos([...todos, {text: newItem, complete: false }])
  }

  return(
    <React.Fragment>
      <ItemList todos={todos} toggleTodo={toggleTodo} />
      <AddItemForm addItem={addItem} />
    </React.Fragment>
  ) 
}

export default App;
