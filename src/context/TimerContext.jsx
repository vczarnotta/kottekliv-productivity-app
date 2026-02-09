import { createContext, useEffect, useReducer } from "react";
import useFormatTime from "../hooks/useFormatTime";



// ---- HELPER FUNCTIONS ----

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

// ---- LOGIC/BRAIN ----

// timer data handling (using ms)
// ALL USE ----> payload: {nowMs: Date.now()}
const timerReducer = (state, action) => {
  switch (action.type) {
    
    // start + set current time
    case "START":
      // Scenario 1: Allra första start (ingen tidigare session)
      if (state.msStartTime === 0) {
        return {
          ...state,
          isRunning: true,
          msStartTime: action.payload.nowMs,
        };
      }
      
      // Scenario 2: Resume från paus
      // Beräkna hur länge vi varit pausade
      const pauseDuration = action.payload.nowMs - state.msPauseStart;
      
      return {
        ...state,
        isRunning: true,
        msTotalPaused: state.msTotalPaused + pauseDuration,
        msPauseStart: 0,  // Nollställ eftersom vi inte är pausade längre
      };
      
      // pause + add total worked time
      case "PAUSE":
        return {
          ...state,
          isRunning: false,
          msPauseStart: action.payload.nowMs // Spara när pausen började
        };
        
      // auto update what time user sees on screen
      case "TICK":
        // Aktiv tid = (nu - start) - total pausad tid
        const elapsed = action.payload.nowMs - state.msStartTime;
        const activeTime = elapsed - state.msTotalPaused;
        
        return {
          ...state,
          msDisplay: activeTime
        };
      
      // format + unique id + save + reset
      case "SAVE":
        // incoming data
        const sessionData = action.payload.sessionData;
        
        // resets and saves
        return {
          ...state,
          isRunning: false,
          msStartTime: 0,
          msPauseStart: 0,
          msTotalPaused: 0,
          msDisplay: 0,
          lastSession: sessionData
        };
      
    default:
      return state;
  }
}

// ---- MANUAL ----
/**
 * All tools you get from TimerContext.
 *
 * @typedef {Object} TimerContextValue
 * @property {{ isRunning: boolean, msDisplay: number, msAccumulated: number, msStartTime: number, lastSession: {id: string, startDate: string, startTime: string, endTime: string, activeTime: string} | null }} state - Current timer state.
 * @property {() => void} startTimer - Start or resume the timer.
 * @property {() => void} pauseTimer - Pause and keep progress.
 * @property {() => void} saveTimer - Save current session and reset (validates non-zero time).
 * @property {() => number} currentTimer - Get current time in human readable format.
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
 * - `currentTimer()`: get current time in human readable format.
 *
 * @type {import("react").Context<TimerContextValue>}
 */

// ---- EXPORT/PROVIDER ----

export const TimerContext = createContext();

export function TimerProvider({children}) {

  const makeMsReadable = useFormatTime()

  // import and initiate timer (logic + storage)
  const [state, dispatch] = useReducer(timerReducer, {
    isRunning: false,
    msStartTime: 0,
    msPauseStart: 0,
    msTotalPaused: 0,
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

  const saveTimer = () => {
    // Check if timer has never been started
    if (state.msStartTime === 0) {
      alert("Cannot save a session with 0 time! gotta work harder smh");
      return null;
    }

    const now = Date.now();
    
    // Calculate final duration using the new pause-tracking method
    // finalDuration = (now - start) - totalPaused
    let totalPaused = state.msTotalPaused;
    
    // If currently paused, add current pause duration
    if (!state.isRunning && state.msPauseStart > 0) {
      totalPaused += (now - state.msPauseStart);
    }
    
    const finalDuration = (now - state.msStartTime) - totalPaused;

    const startDate = new Date(state.msStartTime);
    const endDate = new Date(now);

    const sessionData = {
      id: crypto.randomUUID(),
      startDate: formatDate(startDate),      // "2026-01-28"
      startTime: formatTime(startDate),      // "08:30"
      endTime: formatTime(endDate),          // "10:00"
      activeTime: makeMsReadable(finalDuration), // "1h 30min"
      msDuration: finalDuration             // "16000" -> pure ms
    };

    dispatch({ type: "SAVE", payload: { sessionData } });

    return sessionData;
  };
  const currentTimer = () => makeMsReadable(state.msDisplay);

  const test = "yas queen slay!";

  const newestSession = state.lastSession

  return (
    <TimerContext.Provider value={{test, state, startTimer, pauseTimer, saveTimer, currentTimer, newestSession}}>
      {children}
    </TimerContext.Provider>
  )
}
