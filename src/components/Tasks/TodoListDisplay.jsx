import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import "./TodoListDisplay.css";


// Can choose if "delete" button should be visible
function TodoListDisplay({ showDeleteButton = false }) {

    // imports global info
    const { state, dispatch } = useContext(TodoContext);

    // new array that is sorted based on completion status
    const sortedTasks = [...state].sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted - b.isCompleted // sort by completion status
      }
      // If both completed, sort by when they were completed (earliest first, latest last)
      return (a.completedAt || 0) - (b.completedAt || 0)
    })
    
    // returns an unordered list with all tasks
    return (
        <ul>
        {sortedTasks.map((task) => (
            <li 
                key={task.id}
                className={task.isCompleted ? "todo-item completed" : "todo-item"}
            >
                <span>{task.text}</span>
                <div>
                    {showDeleteButton && (
                        <button onClick={() => dispatch({ type: "DELETE", payload: task.id })}>
                            X
                        </button>
                    )}
                    <input
                        type="checkbox"
                        className="todo-checkbox"
                        checked={task.isCompleted}
                        onChange={() => dispatch({ type: "TOGGLE", payload: task.id })}
                    />
                </div>
            </li>
        ))}
        </ul>
    );
    }

export default TodoListDisplay;