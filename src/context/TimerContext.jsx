import { createContext, useEffect, useReducer } from "react";

// Convert ms to human readable format
// Examples: "45s", "3min 20s", "1h 30min", "2h 0min"
function formatActiveTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  // If there are hours, always show hours and minutes (even if 0min)
  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  
  // If there are minutes, show minutes and seconds
  if (minutes > 0) {
    return `${minutes}min ${seconds}s`;
  }
  
  // Less than a minute, just show seconds
  return `${seconds}s`;
}

// Extract HH:MM from Date object (so i know when session started and ended) (Sun Feb 01 2026 17:26:40 GMT+0100 ---> 17:26)
function formatTime(date) {
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minute}`;
}

// Get YYYY-MM-DD from Date object (Sun Feb 01 2026 17:26:40 GMT+0100 ---> 2026-02-01)
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

// timer data handling (using ms)
// ALL USE ----> payload: {nowMs: Date.now()}
const timerReducer = (state, action) => {
  switch (action.type) {
    
    // start + set current time
    case "START":
      return {
        ...state,
        isRunning: true,
        // Only set msStartTime if this is first start (not resume)
        msStartTime: state.msStartTime === 0 ? action.payload.nowMs : state.msStartTime
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

        // convert ms -> Date object so the helper functions can handle it
        const startDate = new Date(state.msStartTime);
        const endDate = new Date(action.payload.nowMs);

        // saving format with human-readable times
        const newSession = {
          id: crypto.randomUUID(),
          startDate: formatDate(startDate),      // "2026-01-28"
          startTime: formatTime(startDate),      // "08:30"
          endTime: formatTime(endDate),          // "10:00"
          activeTime: formatActiveTime(finalDuration) // "1h 30min"
        }
        
        // resets and saves
        return {
          ...state,
          isRunning: false,
          msAccumulated: 0,
          msStartTime: 0,
          msDisplay: 0,
          lastSession: newSession  // Single object, not array
        };
      
    default:
      return state;
  }
}


/**
 * All tools you get from TimerContext.
 *
 * @typedef {Object} TimerContextValue
 * @property {{ isRunning: boolean, msDisplay: number, msAccumulated: number, msStartTime: number, lastSession: {id: string, startDate: string, startTime: string, endTime: string, activeTime: string} | null }} state - Current timer state.
 * @property {() => void} startTimer - Start or resume the timer.
 * @property {() => void} pauseTimer - Pause and keep progress.
 * @property {() => void} saveTimer - Save current session and reset (validates non-zero time).
 * @property {() => number} currentTimer - Get current time in ms.
 * @property {string} test - Debug string for experiments.
 */

/**
 * Global timer context.
 *
 * Tools:
 * - `state`: current timer state with lastSession object.
 * - `startTimer()`: start or resume the timer.
 * - `pauseTimer()`: pause and keep progress.
 * - `saveTimer()`: save current session with human-readable format and reset.
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
    lastSession: null,
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

  // functions that UI can use
  const startTimer = () => dispatch({ type: "START", payload: { nowMs: Date.now() } });
  const pauseTimer = () => dispatch({ type: "PAUSE", payload: { nowMs: Date.now() } });
  const saveTimer = () => dispatch({ type: "SAVE", payload: { nowMs: Date.now() } });
  const currentTimer = () => state.msDisplay;

  const test = "yas queen slay!";

  return (
    <TimerContext.Provider value={{test, state, startTimer, pauseTimer, saveTimer, currentTimer}}>
      {children}
    </TimerContext.Provider>
  )
}
