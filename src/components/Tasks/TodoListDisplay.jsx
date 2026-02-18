import { useParams } from "react-router-dom";
import { useTodo } from "../../context/TodoContext";
import { Circle, CheckCircle2 } from "lucide-react"
import "./TodoListDisplay.css";


// Can choose if "delete" button should be visible
function TodoListDisplay({isOverview = false }) {

  // imports global info
  const { state, dispatch } = useTodo()
  const { listId: urlListId } = useParams()

  //Find which todos to show
  let tasksToDisplay = []

  if (isOverview || !urlListId) {
    // If in a specific list
    tasksToDisplay = state.flatMap((list) =>
    (list.todos || []).map((todo) => ({ ...todo, listId: list.id })))
  } else {
    // If in overview - show all lists and tag with listId
    const currentList = state.find((list) => list.id.toString() === urlListId);
    tasksToDisplay = currentList ? currentList.todos : []
  }

  // new array that is sorted based on completion status
  const sortedTasks = [...tasksToDisplay].sort((a, b) => {
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted - b.isCompleted // sort by completion status
    }
    // If both completed, sort by when they were completed (earliest first, latest last)
    return (a.completedAt || 0) - (b.completedAt || 0)
  })
  
  // returns an unordered list with all tasks
  return (
    <ul className="todo-list">
      {sortedTasks.map((task) => (
        <li 
        key={task.id}
        className={task.isCompleted ? "todo-item completed" : "todo-item"}
        >
          <div className="todo-checkbox">
            <button 
              onClick={() => dispatch({ type: "TOGGLE_TODO", payload: {todoId: task.id, listId: urlListId || task.listId} })}
              className="check-btn"
            >
              {task.isCompleted ? (
                <CheckCircle2 size={20} color="var(--color-primary)" fill="var(--color-primary-light)" />
              ) : (
                <Circle size={20} color="var(--color-primary)" />
              )}
            </button>
          </div>
          <p>
            <span className="todo-text">{task.text}</span>
            {isOverview && <span className="list-tag"> ({state.find(l => l.id === task.listId)?.title})</span>}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default TodoListDisplay;