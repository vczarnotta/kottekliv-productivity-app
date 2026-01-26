import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";


// kan välja om "ta bort" knapp skall synas
function TodoListDisplay({ showDeleteButton = false }) {

    // importerar global info
    const { state, dispatch, totalItems } = useContext(TodoContext);

    // returnerar en unordered list med alla tasks.
    return (
        <ul>
        {state.map((task) => (
            <li key={task.id}>
            {task.text}
            {showDeleteButton && (
                <button onClick={() => dispatch({ type: "DELETE", payload: task.id })}>
                    X
                </button>
            )}
            </li>
        ))}
        </ul>
    );
    }

export default TodoListDisplay;