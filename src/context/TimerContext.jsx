// 
// brain -> Using new Date() to decide tiem passed
// export -> Saves (1) current timer and (2) total time
// control -> Start, Pause, Finish (saves and resets)

import { createContext } from "react"

export const TimerContext = createContext();


export function TimerProvider({children}) {


  const test = "yas queen slay!";

  return (
    <TimerContext.Provider value={{test}}>
      {children}
    </TimerContext.Provider>
  )
}