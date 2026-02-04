import Timer from "../../components/Timer/Timer"
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"
import Modal from "../../components/Modal/Modal"
import Productivity from "../../components/Productivity/Productivity"

import { TimerContext } from "../../context/TimerContext"
import SessionContext from "../../context/Session/SessionContext"
import { useState, useContext } from "react"

import "./TimerPage.css"

function TimerPage() {
  const [ formData, setFormData ] = useState({sessionName: "", category: "Other"})
  const [ currentId, setCurrentId ] = useState(null)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ chosenProductivity, setChosenProductivity ] = useState(null)

  const { startTimer, pauseTimer, saveTimer, state } = useContext(TimerContext);
  const { addSession, editSession } = useContext(SessionContext)

  //Create new session when save button is clicked
  const handleSave = () => {
    
    //Get timerData from Timer component
    const timerData = saveTimer()
    
    const newSession = {
      id: timerData.id,
      sessionName: formData.sessionName,
      category: formData.category,
      date: timerData.startDate,  
      startTime: timerData.startTime,
      endTime: timerData.endTime,
      activeTime: timerData.activeTime,
    }

    addSession(newSession) //Adds to history
    setCurrentId(timerData.id) //Saves id to know which session to add productivity to
    setIsModalOpen(true) //Opens the productivity modal
    setFormData({sessionName: "", category: "Other"}) //Reset formData
  }

  /**
   * Update session with productivity
   * @param {string} level - (e.g. "3 - Good") from Productivity-component.
   */
  const addProductivity = (level) => {
    editSession({
      id: currentId,
      productivity: level
    })

    setIsModalOpen(false) //Close modal
  }


  return(
    <div className="main-container">

      <div className="timer-circle">
        <Input
          name={"sessionName"}
          placeholder="Add session name..."
          onChange={(e) => setFormData({...formData, sessionName: e.target.value})}
        />

        <Timer />

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
      </div>

      <div className="timer-button-row">
        {/* Toggle between pause and start button */}
        {state.isRunning ? 
        <Button variant="secondary" onClick={pauseTimer}>Pause</Button>
        :
        <Button variant={state.msDisplay < 1 ? "primary" : "secondary"} onClick={startTimer}>Start</Button>
        }
        
        {/* Disable save button if timer has not been started */}
        <Button onClick={handleSave} disabled={state.msDisplay < 1}>Save</Button>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {/* Productivity sends level through onLevelSelect callback */}
          <Productivity onLevelSelect={(level) => setChosenProductivity(level)}/>
          <Button
            onClick={() => addProductivity(chosenProductivity)}
          >
            Save Productivity
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