import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./TodoList.css";
import { useTodo } from "../../context/TodoContext";
import TodoListDisplay from "./TodoListDisplay";


function TodoList() {

  const [text, setText] = useState("");
  const {listId} = useParams<{listId: string}>() //Get ID from URL
  const {dispatch, totalItems} = useTodo();



  const handleSubmit = (event: React.SubmitEvent) => { // avoids weird refresh i think?
      event.preventDefault();
      if (text.trim() === "" || !listId) return

      // sends text as payload and then deletes it from text useState
      dispatch({ type: "ADD_TODO", payload: {text, listId}}) 
      setText("");
  };


  return (
  <>
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        id="taskInput"
        onChange={(event => setText(event.target.value))}
        placeholder="Add a new task..." 
      />
      
      <Button type="submit">
        Add Task
      </Button>
    </form>

    <h3>{totalItems} items on your list</h3>

    <TodoListDisplay showDeleteButton={false} />
  </>
  )
}

export default TodoList