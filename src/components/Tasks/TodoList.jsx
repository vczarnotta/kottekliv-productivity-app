import { useReducer, useState } from "react";
import Button from "../Button/Button";
import "./TodoList.css";

// list is empty at first
const initialState = [];


function toDoreducer(state, action) {
    switch (action.type) {
        case "ADD":
            return [...state, { text: action.payload, id: Date.now()}]; // attatch unique id so i can delete later
        case "DELETE":
            return state.filter(task => task.id !== action.payload); // returnerar allt förutom det som matchade
        default:
            return state;
    }
}


function TodoList() {

    const [text, setText] = useState("");
    const [state, dispatch] = useReducer(toDoreducer, initialState);

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
        <button onClick={console.log(state)}>console log</button>
    </>
    )
}

export default TodoList