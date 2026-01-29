import { createContext, useEffect, useReducer } from "react";

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
        
      // auto update what time user sees on screen
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
          msDisplay: 0,
          sessions: [...state.sessions, newSession]
        };
      
    default:
      return state;
  }
}


/**
 * All tools you get from TimerContext.
 *
 * @typedef {Object} TimerContextValue
 * @property {{ isRunning: boolean, msDisplay: number, msAccumulated: number, msStartTime: number, sessions: any[] }} state - Current timer state in ms.
 * @property {() => void} start - Start or resume the timer.
 * @property {() => void} pause - Pause and keep progress.
 * @property {() => void} save - Save current session and reset.
 * @property {() => number} currentTimer - Get current time in ms.
 * @property {string} test - Debug string for experiments.
 */

/**
 * Global timer context.
 *
 * Tools:
 * - `state`: current timer state in ms.
 * - `start()`: start or resume the timer.
 * - `pause()`: pause and keep progress.
 * - `save()`: save current session and reset.
 * - `currentTimer()`: get current time in ms.
 *
 * @type {import("react").Context<TimerContextValue>}
 */
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
      }, 100)
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
  const currentTimer = () => new Date(state.msDisplay).getSeconds();
  const startTime = new Date(-156563567);

  const test = "yas queen slay!";

  return (
    <TimerContext.Provider value={{test, state, start, pause, save, currentTimer, startTime}}>
      {children}
    </TimerContext.Provider>
  )
}