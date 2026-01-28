import { useContext } from "react";
import { TimerContext } from "../../context/TimerContext";
import Button from "../Button/Button";
import styles from "./Timer.module.css";

function Timer() {
  const {currentTimer, start, pause, save } = useContext(TimerContext);


  return (
    <>
      <h1>Timer:</h1>
      <h2>{currentTimer()}</h2>
      
      <div className={styles.buttons}>
        <Button size="small" onClick={start}>Start</Button>
        <Button size="small" onClick={pause}>Pause</Button>
        <Button size="small" onClick={save}>Save</Button>
      </div>
      <h3>Timer History:</h3>
    </>
  )
}

export default Timer;