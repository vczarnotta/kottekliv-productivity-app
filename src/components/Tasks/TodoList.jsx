import { useReducer, useState, useEffect, useCallback, useContext } from "react";
import Button from "../Button/Button";
import "./TodoList.css";
import { TodoContext } from "../../context/TodoContext";


function TodoList() {

    const [text, setText] = useState("");
    const {state, dispatch, totalItems} = useContext(TodoContext);


    const handleSubmit = (event) => { // avoids weird refresh i think?
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
            placeholder="Lägg til en grejs" 
            /> 
            <Button type="submit" onClick={() => {console.log()}}>Lägg till</Button>
        </form>
        <h3>{totalItems} saved items on the list</h3>
        <ul>
            {state.map((task) => (
                <li key={task.id}>
                    {task.text}
                    <button onClick={() => dispatch({ type: "DELETE", payload: task.id})}>
                        X
                    </button>
                </li>
            ))}
        </ul>

        {/* bugfix // dev */}
        <button onClick={() => console.log(localStorage.getItem("users-todo-list"))}>console log</button>
    </>
    )
}

export default TodoList