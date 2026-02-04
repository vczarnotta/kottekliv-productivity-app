// get saved list from previous session, or return empty list
export const initialState = () => {
  const savedData = localStorage.getItem("users-todo-list")

  return savedData ? JSON.parse(savedData) : [];

// typeof(localStorage.getItem("users-todo-list")) ----> string ----> empty string = falsy
}

export function toDoreducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { text: action.payload, id: Date.now()}]; // attatch unique id so i can delete later
    case "DELETE":
      return state.filter(task => task.id !== action.payload); // returnerar allt förutom det som matchade
    default:
      return state;
  }
}