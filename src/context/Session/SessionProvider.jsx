import { useReducer } from "react"
import SessionContext from "./SessionContext"

function SessionReducer(state, action) {
  let newState = null

  switch(action.type) {
    case "ADD":
      newState = [action.payload, ...state]
      break 
    case "DELETE":
      newState = state.filter(session => session.id !== action.payload)
      break
    case "EDIT":
      newState = state.map(session => session.id === action.payload.id ? action.payload : session) 
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

  const addSession = (completeSession) => {
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
    <SessionContext.Provider value={{ sessions: state, addSession, deleteSession, editSession }}>
      {children}
    </SessionContext.Provider>
  )

}

export default SessionProvider
