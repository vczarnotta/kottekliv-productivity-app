import { createContext, useReducer, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  completedAt?: number | null;
}

type TodoAction =
  | { type: "ADD"; payload: string }
  | { type: "DELETE"; payload: number}
  | { type: "TOGGLE"; payload: number};
//
// använda "createContext" som en radio som skickar info till komponenter
//

interface TodoContextType {
  state: Todo[];
  dispatch: React.Dispatch<TodoAction>;
  totalItems: number;
}

// sändaren
export const TodoContext = createContext<TodoContextType | undefined>(undefined);


// get saved list from previous session, or return empty list
const getSavedTodos = (): Todo[] => {
  const savedData = localStorage.getItem("users-todo-list")

  return savedData ? JSON.parse(savedData) as Todo[] : [];

// typeof(localStorage.getItem("users-todo-list")) ----> string ----> empty string = falsy
};


function toDoreducer(state: Todo[], action: TodoAction) {
  switch (action.type) {
    case "ADD":
      return [...state, { text: action.payload, isCompleted: false, id: Date.now()}]; // attatch unique id so i can delete later -> using date so i can sort based on creation
    case "DELETE":
      return state.filter(task => task.id !== action.payload); // returnerar allt förutom det som matchade
    case "TOGGLE":
      // if ID matches, switch the toggle
      return state.map(task => {
        if (task.id === action.payload) {
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
    default:
      return state;
  }
}


export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(toDoreducer, getSavedTodos());

  useEffect(() => {
    localStorage.setItem("users-todo-list", JSON.stringify(state));
  }, [state])

  const totalItems = Object.keys(state).length;


  // value=  är antenn signalerna som skickas. 
  // state -> returns state object
  // dispatch -> use to update state object (reducer function)
  // totalItems -> returns total items on todo list
  return (
    <TodoContext.Provider value={{ state, dispatch, totalItems }}> 
      {children}
    </TodoContext.Provider>
  )
}