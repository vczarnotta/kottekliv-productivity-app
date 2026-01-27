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

// current session + all sessions
let initialstate = {
  isRunning: false,
  msPassed: 0,
  sessions: [], // saves session object. {id, startTime, endTime, sessionLengthMs}  (later i can use sessions.startTime in a filter/function to sort what days it happened)
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