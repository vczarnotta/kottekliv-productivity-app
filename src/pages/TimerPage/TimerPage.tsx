import { useState } from "react"

import Timer from "../../components/Timer/Timer"
import Input from "../../components/Input/Input"
import Select from "../../components/Input/Select"
import Button from "../../components/Button/Button"
import Modal from "../../components/Modal/Modal"
import Productivity from "../../components/Productivity/Productivity"

import { useTimerContext } from "../../context/TimerContext"
import { useSessions } from "../../context/SessionContext"

import "./TimerPage.css"

interface FormData {
  sessionName: string;
  category: string;
}

function TimerPage() {
  const [formData, setFormData] = useState<FormData>({ sessionName: "", category: "Other" })
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [chosenProductivity, setChosenProductivity] = useState<string | null>(null)

  const { startTimer, pauseTimer, saveTimer, state } = useTimerContext();
  const { addSession, editSession } = useSessions()

  // Create new session when save button is clicked
  const handleSave = () => {
    const timerData = saveTimer()
    if (!timerData) return;

    const newSession = {
      id: timerData.id,
      sessionName: formData.sessionName,
      category: formData.category,
      date: timerData.startDate,
      startTime: timerData.startTime,
      endTime: timerData.endTime,
      activeTime: timerData.activeTime,
      msDuration: timerData.msDuration,
      productivity: "0 - Not Rated",
    }

    addSession(newSession)
    setCurrentId(timerData.id)
    setIsModalOpen(true)
    setFormData({ sessionName: "", category: "Other" })
  }

  const addProductivity = (level: string) => {
    if (!currentId) return;
    editSession({
      id: currentId,
      sessionName: formData.sessionName,
      category: formData.category,
      date: "",
      startTime: "",
      endTime: "",
      activeTime: "",
      msDuration: 0,
      productivity: level,
    })

    setIsModalOpen(false)
  }

  return (
    <div className="main-container">

      <div className="timer-circle">
        <Input
          name={"sessionName"}
          id="sessionName"
          placeholder="Add session name..."
          autoComplete="off"
          onChange={(e) => setFormData({ ...formData, sessionName: e.target.value })}
        />

        <Timer />

        <Select
          name={"category"}
          id="category"
          selectLabel={"Select Category"}
          defaultValue={""}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
        {state.isRunning ?
          <Button variant="secondary" onClick={pauseTimer}>Pause</Button>
          :
          <Button variant={state.msDisplay < 1 ? "primary" : "secondary"} onClick={startTimer}>Start</Button>
        }

        <Button onClick={handleSave} disabled={state.msDisplay < 1}>Save</Button>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Productivity onLevelSelect={(level) => setChosenProductivity(level)} />

          <div className="productivity-buttons">
            <Button onClick={() => addProductivity(chosenProductivity ?? "0 - Not Rated")}>
              Save
            </Button>

            <Button onClick={() => setIsModalOpen(false)} variant="secondary">
              Skip
            </Button>
          </div>
        </Modal>
      )}

    </div>
  )
}

export default TimerPage
