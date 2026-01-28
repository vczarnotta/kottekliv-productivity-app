import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";


// Can choose if "delete" button should be visible
function TodoListDisplay({ showDeleteButton = false }) {

    // imports global info
    const { state, dispatch } = useContext(TodoContext);

    // returns an unordered list with all tasks
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