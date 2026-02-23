import { createContext, useReducer, useEffect, useContext, useCallback } from "react";
import TodoList from "../components/Tasks/TodoListForm";

export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  completedAt?: number | null;
}

export interface TodoList {
  id: string;
  title: string;
  todos: Todo[];
}

type TodoAction =
  | { type: "CREATE_LIST"; payload: {title: string, id: string} }
  | { type: "DELETE_LIST"; payload: string}
  | { type: "ADD_TODO"; payload: {text: string, listId: string} }
  | { type: "TOGGLE_TODO"; payload: {todoId: number, listId: string}}
  | { type: "EDIT_TODO"; payload: {todoId: number, listId: string, newText: string}}
  | { type: "DELETE_TODO"; payload: {todoId: number, listId: string}}
//
// använda "createContext" som en radio som skickar info till komponenter
//

interface TodoContextType {
  state: TodoList[];
  dispatch: React.Dispatch<TodoAction>;
  getProgress: (todos: Todo[]) => { totalTodos: number; finishedTodos: number }
}

// sändaren
export const TodoContext = createContext<TodoContextType | undefined>(undefined);


// get saved list from previous session, or return empty list
const getSavedTodos = (): TodoList[] => {
  const savedData = localStorage.getItem("users-todo-list")

  return savedData ? JSON.parse(savedData) : [];

// typeof(localStorage.getItem("users-todo-list")) ----> string ----> empty string = falsy
};


function toDoreducer(state: TodoList[], action: TodoAction) {
  switch (action.type) {
    case "CREATE_LIST":
      return [...state, {id: action.payload.id, title: action.payload.title, todos: []}]
    case "DELETE_LIST":
      return state.filter((list: TodoList) => list.id !== action.payload)
    case "ADD_TODO":
      return state.map((list) => {
        if (list.id === action.payload.listId) {
          return {
            ...list,
            todos: [...list.todos, {text: action.payload.text, isCompleted: false, id: Date.now()}] // attatch unique id so i can delete later -> using date so i can sort based on creation
          }
        }
        return list
      })      
    case "DELETE_TODO":
      return state.map((list) => {
        if(list.id === action.payload.listId) {
          return {
            ...list,
            todos: list.todos.filter((task: Todo) => task.id !== action.payload.todoId) // returnerar allt förutom det som matchade
          }
        }
        return list
      })
    case "EDIT_TODO":
      return state.map((list) => {
        if(list.id === action.payload.listId) {
          return {
            ...list,
            todos: list.todos.map((todo) => {
              if(todo.id === action.payload.todoId) {
                return {
                  ...todo,
                  text: action.payload.newText
                }
              }
              return todo
            })
          }
        }
        return list
      })
    case "TOGGLE_TODO":
      // if ID matches, switch the toggle
      return state.map(list => {
        if(list.id === action.payload.listId) {
          return {
            ...list,
            todos: list.todos.map((task: Todo) => {
              if (task.id === action.payload.todoId) {
                const newIsCompleted = !task.isCompleted
                // if yes -> reverse the isCompleted boolean and save timestamp
                return { 
                  ...task, 
                  isCompleted: newIsCompleted,
                  completedAt: newIsCompleted ? Date.now() : null
                }
              }
              // if no -> don't change it
              return task
            })
          }
        }
        return list
      })
    default:
      return state;
  }
}


export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(toDoreducer, getSavedTodos());

  useEffect(() => {
    localStorage.setItem("users-todo-list", JSON.stringify(state));
  }, [state])

  const getProgress = useCallback((todos: Todo[] = []) => {
    const totalTodos = todos.length;
    const finishedTodos = todos.filter(t => t.isCompleted).length;
    
    return { totalTodos, finishedTodos }
  }, [])


  // value=  är antenn signalerna som skickas. 
  // state -> returns state object
  // dispatch -> use to update state object (reducer function)
  // totalItems -> returns total items on todo list
  return (
    <TodoContext.Provider value={{ state, dispatch, getProgress }}> 
      {children}
    </TodoContext.Provider>
  )
}

// kolla så conext ej är undefined
export const useTodo = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodo mste användas inom en TodoProvider")
  }

  return context
}