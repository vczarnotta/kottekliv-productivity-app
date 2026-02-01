import Timer from "../components/Timer/Timer"
import Input from "../components/Input/Input"
import Button from "../components/Button/Button"
import Modal from "../components/Modal/Modal"
import Performance from "../components/Performance/Performance"

import { TimerContext } from "../context/TimerContext"
import SessionContext from "../context/Session/SessionContext"
import { useState, useContext } from "react"

function TimerPage() {
  const [ formData, setFormData ] = useState({sessionName: "Untitled Session", category: "Other"})
  const [ currentId, setCurrentId ] = useState(null)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ chosenPerformance, setChosenPerformance ] = useState(null)

  const { startTimer, pauseTimer, saveTimer, state } = useContext(TimerContext);
  const { addSession, editSession } = useContext(SessionContext)

  //Create new session when save button is clicked
  const handleSave = () => {
    saveTimer()
    
    // Now state.lastSession is a single object, not array
    const timerData = state.lastSession
    
    // Check if save was successful (timerData exists)
    if (!timerData) {
      return; // saveTimer blocked it (0 time)
    }

    const newSession = {
      id: timerData.id,
      sessionName: formData.sessionName || "Untitled Session",
      category: formData.category,
      date: timerData.startDate,  
      startTime: timerData.startTime,
      endTime: timerData.endTime,
      activeTime: timerData.activeTime,
      performance: "Not rated"
    }

    addSession(newSession) //Adds to history
    setCurrentId(timerData.id) //Saves id to know which session to add performance to
    setIsModalOpen(true) //Opens the performance modal
  }

  /**
   * Update session with performance
   * @param {string} level - (e.g. "3 - Good") from Performance-component.
   */
  const addPerformance = (level) => {
    editSession({
      id: currentId,
      performance: level
    })

    setIsModalOpen(false) //Close modal
  }


  return(
    <div className="main-container">
      <Input
        name={"sessionName"}
        placeholder="Add session name..."
        onChange={(e) => setFormData({...formData, sessionName: e.target.value})}
      />

      <Input 
        name={"category"}
        type={"select"} 
        selectLabel={"Select Category"}
        defaultValue={""}
        onChange={(e) => setFormData({...formData, category: e.target.value})}

        options={[
          "Deep Work", 
          "Admin", 
          "Meeting", 
          "Break", 
          "Other"
        ]}
      />

      <Timer />

      <Button size="small" onClick={startTimer}>Start</Button>
      <Button size="small" onClick={pauseTimer}>Pause</Button>
      <Button size="small" onClick={handleSave}>Save</Button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {/* Performance sends level through onLevelSelect callback */}
          <Performance onLevelSelect={(level) => setChosenPerformance(level)}/>
          <Button
            onClick={() => addPerformance(chosenPerformance)}
          >
            Save Performance
          </Button>

          <Button
            onClick={() => setIsModalOpen(false)}
          >
            Skip
          </Button>
        </Modal>
      )}

    </div>
  )
}

export default TimerPage