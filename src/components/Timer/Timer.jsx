import { useContext } from "react";
import { TimerContext } from "../../context/TimerContext";
import "./Timer.css"

function Timer() {
  const { currentTimer } = useContext(TimerContext);


  return (
    <h2 className="timer">{currentTimer()}</h2>
  )
}

export default Timer;