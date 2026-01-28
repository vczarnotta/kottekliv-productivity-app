import { createContext, useEffect, useReducer, useRef } from "react";

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
//   msAccumulated: 0,
//   msStartTime: 0,
//   msEndTime: 0,
//   sessions: [], // saves session object. {id, startTime, endTime, msAccumulated}  (later i can use sessions.startTime in a filter/function to sort what days it happened)
// }

// get saved list from previous session, or return empty list
const getSavedTimers = () => {
  const savedData = localStorage.getItem("user-timers")

  return savedData ? JSON.parse(savedData) : [];

// typeof(localStorage.getItem("users-todo-list")) ----> string ----> empty string == falsy
};


// timer data handling (using ms)
// I can later convert that to human readable time
// ALL USE ----> payload: {nowMs: Date.now()}
const timerReducer = (state, action) => {
  switch (action.type) {
    
    // start + set current time
    case "START":
      return {
        ...state,
        isRunning: true,
        msStartTime: action.payload.nowMs
      };
      
      // pause + add total worked time
      case "PAUSE":
        const sessionDuration = action.payload.nowMs - state.msStartTime;
        
        return {
          ...state,
          isRunning: false,
          msAccumulated: state.msAccumulated + sessionDuration
        };
        
      // update what time user sees on screen
      case "TICK":
        return {
          ...state,
          msDisplay: state.msAccumulated + (action.payload.nowMs - state.msStartTime)
        };
      
      // format + unique id + save + reset
      case "SAVE":
        let finalDuration = state.msAccumulated;

        // if timer still active, add last ramaining time on top
        if (state.isRunning) {
          finalDuration += (action.payload.nowMs - state.msStartTime);
        }

        // saving format
        const newSession = {
          id: crypto.randomUUID(),
          msStartTime: state.msStartTime,
          msEndTime: action.payload.nowMs,
          msTotalWorked: finalDuration,
        }
        // resets and saves
        return {
          ...state,
          isRunning: false,
          msAccumulated: 0,
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

  // import and initiate timer (logic + storage)
  const [state, dispatch] = useReducer(timerReducer, {
    isRunning: false,
    msAccumulated: 0,
    msStartTime: 0,
    msDisplay: 0,
    sessions: getSavedTimers(),
  });


  // make timer run when true
  useEffect(() => {
    let interval;

    if (state.isRunning) {
      interval = setInterval(() => {
        dispatch({ type: "TICK", payload: { nowMs: Date.now() } });
      }, 10)
    }

    return () => clearInterval(interval);
  }, [state.isRunning]);

  // save to localstorage when new session is added
  useEffect(() => {
    localStorage.setItem("user-timers", JSON.stringify(state.sessions));
  }, [state.sessions]);

  // functions that UI can use
  const start = () => dispatch({ type: "START", payload: { nowMs: Date.now() } });
  const pause = () => dispatch({ type: "PAUSE", payload: { nowMs: Date.now() } });
  const save = () => dispatch({ type: "SAVE", payload: { nowMs: Date.now() } });


  const test = "yas queen slay!";

  return (
    <TimerContext.Provider value={{test, state, start, pause, save}}>
      {children}
    </TimerContext.Provider>
  )
}