import { useState, useEffect } from "react";
import styles from "./Timer.module.css";

function Timer() {
  const [milliseconds, setMilliseconds] = useState(0);
  const [timerToggle, setTimerToggle] = useState(false);

  // using live ms to create the different times
  const time = {
    hours: Math.floor(milliseconds / 3600000),
    minutes: Math.floor(milliseconds / 60000)%60,
    seconds: Math.floor(milliseconds / 1000)%60, // 10*10
    milliseconds: milliseconds
  }

  // full reset
  const resetTimer = () => {
    setTimerToggle(false)
    setMilliseconds(0)
  }

  // TOGGLE TIMER
  useEffect(() => {

    if (timerToggle === true) {
      //every "interval" gets an id when using SetInterval
      const intervalId = setInterval(() => {
        setMilliseconds(prev => prev + 100);
      }, 100) // updating every 1ms made it slow, so 100ms instead

      // removes the previous interval, so only 1 interval runs
      return () => {
        clearInterval(intervalId)
      }
    } 

  }, [timerToggle])

  return (
    <>
      <div className="time-display">{`${time.hours}h : ${time.minutes}min : ${time.seconds}s`}</div>
      <div className={styles.buttons}>
        <button onClick={() => setTimerToggle(true)}>Start</button>
        <button onClick={() => setTimerToggle(false)}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </>
  )
}

export default Timer;