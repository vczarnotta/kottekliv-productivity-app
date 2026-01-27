import { createContext, useReducer, useRef } from "react";

// inside out.
//
// Flow:
// Start timer -> Save worked time (id + localstorage) -> add to total (ms) -> reset current timer (if id is in list) 
//
// Store: 
// Start -> Date()
// End -> Date()
// current session -> ms
// total time worked -> ms
// id -> crypto
// 
// using helper functions to convert for display when needed.
//
//
// Interact:
// Start
// Pause
// Save
//
//
// Tools:
// Toggle -> useEffect()
// time -> setinterval + Date() + useRef
// Storage -> useReducer()
// Memory -> Localstorage

// // current session + all sessions -> grab from localstorage in the future
// let initialstate = {
//   isRunning: false,
//   msDuration: 0,
//   msStartTime: 0,
//   msEndTime: 0,
//   sessions: [], // saves session object. {id, startTime, endTime, msDuration}  (later i can use sessions.startTime in a filter/function to sort what days it happened)
// }

// get saved list from previous session, or return empty list
const getSavedTimers = () => {
  const savedData = localStorage.getItem("user-timers")

  return savedData ? JSON.parse(savedData) : [];

// typeof(localStorage.getItem("users-todo-list")) ----> string ----> empty string == falsy
};


// useReducer (how i interact with the timer and save it)
const timerReducer = (state, action) => {
  switch (action.type) {
    case "SAVE":
      // saving format
      const newSession = {
        id: crypto.randomUUID(),
        msDuration: state.msDuration,
        msStartTime: state.msStartTime,
        msEndTime: state.msEndTime,
      }
      // resets and saves
      return {
        ...state,
        isRunning: false,
        msDuration: 0,
        msStartTime: 0,
        msEndTime: 0,
        sessions: [...state.sessions, newSession]
      };
    
    default:
      return state;
  }
}



export const TimerContext = createContext();


export function TimerProvider({children}) {


  const test = "yas queen slay!";

  return (
    <TimerContext.Provider value={{test}}>
      {children}
    </TimerContext.Provider>
  )
}