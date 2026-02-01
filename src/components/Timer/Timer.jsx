import { useContext } from "react";
import { TimerContext } from "../../context/TimerContext";

function Timer() {
  const {currentTimer, state } = useContext(TimerContext);


  return (
    <>
      <h1>Timer:</h1>
      <h2>{currentTimer()}</h2>
      <button style={{color: "black"}} onClick={() => {console.log("Last session:", state.lastSession)}}>console log last session</button>
    </>
  )
}

export default Timer;