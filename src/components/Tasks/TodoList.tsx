import { useState } from "react";
import Button from "../Button/Button";
import "./TodoList.css";
import { useTodo } from "../../context/TodoContext";
import TodoListDisplay from "./TodoListDisplay";


function TodoList() {

  const [text, setText] = useState("");
  const {dispatch, totalItems} = useTodo();



  const handleSubmit = (event: React.FormEvent) => { // avoids weird refresh i think?
      event.preventDefault();
      if (text.trim() === "") return;

      // sends text as payload and then deletes it from text useState
      dispatch({ type: "ADD", payload: text}) 
      setText("");
  };


  return (
  <>
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={text}
        onChange={(event => setText(event.target.value))}
        placeholder="Add a new task..." 
      />
      
      <Button type="submit" onClick={() => {console.log()}}>
        Add Task
      </Button>
    </form>

    <h3>{totalItems} items on your list</h3>

    <TodoListDisplay showDeleteButton={false} />

    {/* bugfix // dev */}
    <button onClick={() => console.log(localStorage.getItem("users-todo-list"))}>console log</button>
  </>
  )
}

export default TodoList