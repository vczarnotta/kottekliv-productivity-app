import { useMemo, useReducer } from "react"
import SessionContext from "./SessionContext"
import useFormatTime from "../../hooks/useFormatTime";

//Calculate msDuration if added manually
const calculateDuration = (date, start, end) => {
  const startTime = new Date(`${date} ${start}`);
  const endTime = new Date(`${date} ${end}`);
  
  let msDuration = endTime - startTime;
  
  return msDuration; // Returns ms
}

function SessionReducer(state, action) {
  let newState = null

  switch(action.type) {
    case "ADD": {

      if(!action.payload.msDuration) {
        action.payload.msDuration = calculateDuration(
          action.payload.date, 
          action.payload.startTime, 
          action.payload.endTime
        )
      }

      //Set default value if no input is given
      const sessionToAdd = {
        ...action.payload,
        sessionName: action.payload.sessionName?.trim() || "Untitled Session",
        productivity: action.payload.productivity || "0 - Not Rated",
      }
      newState = [sessionToAdd, ...state]
      break 
    }
    case "DELETE":
      newState = state.filter(session => session.id !== action.payload)
      break
    case "EDIT":
      newState = state.map(session => 
        session.id === action.payload.id 
        ? { 
            ...session,
            ...action.payload
        } 
        : session) 
      break
    default:
      return state
  }

  localStorage.setItem("sessions", JSON.stringify(newState))
  return newState
}

function SessionProvider({children}) {
  const initialState = JSON.parse(localStorage.getItem("sessions")) || []
  const [ state, dispatch ] = useReducer(SessionReducer, initialState)
  const makeMsReadable = useFormatTime()

  //Sort the sessions newest to oldest
  const sortedSessions = useMemo(() => {
    return [...state].sort((a, b) => {
        const dateTimeA = `${a.date} ${a.startTime}`;
        const dateTimeB = `${b.date} ${b.startTime}`;
      return dateTimeB.localeCompare(dateTimeA)
    })
  }, [state])

  const addSession = (completeSession) => {
    //If added manually, add activetime and duration
    if (!completeSession.activeTime) {
      const ms = completeSession.msDuration || calculateDuration(
        completeSession.date,
        completeSession.startTime,
        completeSession.endTime
      )
      
      completeSession.activeTime = makeMsReadable(ms)
      completeSession.msDuration = ms
    }

    dispatch({ type: "ADD", payload: completeSession })
  }

  const deleteSession = (id) => {
    if(window.confirm("Are you sure you want to delete this session?")){
        dispatch({ type: "DELETE", payload: id });
    }
  };

  const editSession = (updatedSession) => {
    dispatch({ type: "EDIT", payload: updatedSession });
  };

  return(
    <SessionContext.Provider value={{ sessions: sortedSessions, addSession, deleteSession, editSession }}>
      {children}
    </SessionContext.Provider>
  )

}

export default SessionProvider
