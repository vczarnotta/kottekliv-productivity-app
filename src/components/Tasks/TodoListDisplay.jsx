import { useState } from "react";
import { useParams } from "react-router-dom";

import { useTodo } from "../../context/TodoContext";
import Input from "../Input/Input";

import { IoRadioButtonOffOutline, IoRadioButtonOn } from "react-icons/io5";
import { FiEdit3, FiTrash } from "react-icons/fi";
import "./TodoListDisplay.css";


// Can choose if "delete" button should be visible
function TodoListDisplay({isOverview = false }) {

  // imports global info
  const { state, dispatch } = useTodo()
  const { listId: urlListId } = useParams()

  const [ editingId, setEditingId ] = useState(null)
  const [ editText, setEditText ] = useState("")

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

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  }

  const handleSaveEdit = (e, task) => {
    e.preventDefault();
    if (editText.trim() === "") return;

    dispatch({
      type: "EDIT_TODO",
      payload: {
        todoId: task.id,
        listId: urlListId || task.listId,
        newText: editText
      }
    });
    setEditingId(null); // Close edit mode
    setEditText("")
  };
  
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
                <IoRadioButtonOn size={20} color="var(--color-primary)"/>
              ) : (
                <IoRadioButtonOffOutline size={20} color="var(--color-primary)" />
              )}
            </button>
          </div>
          {editingId === task.id ? (
            <form action="submit" onSubmit={(e) => handleSaveEdit(e, task)} className="todo-edit-form">
              <Input
                autoFocus
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={(e) => handleSaveEdit(e, task)}
              />
            </form>
          ) : (
            <p>
              <span className="todo-text">{task.text}</span>
              {isOverview && <span className="list-tag"> ({state.find(l => l.id === task.listId)?.title})</span>}
            </p>
          )}
          {!editingId &&
          <div className="todo-button-wrapper">
            <button className="edit-todo-button" onClick={() => handleStartEdit(task)}>
              <FiEdit3/>
            </button>
            <button className="edit-todo-button" onClick={() => {
              dispatch({ 
                type: "DELETE_TODO", 
                payload: { todoId: task.id, listId: urlListId || task.listId } 
              })
            }}
            >
              <FiTrash/>
            </button>
          </div>
          }
        </li>
      ))}
    </ul>
  );
}

export default TodoListDisplay;