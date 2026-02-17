import { useState } from "react";
import { type Session, useSessions } from "../../../context/SessionContext";
import useFormatTime from "../../../hooks/useFormatTime";

import Modal from "../Modal";
import Card from "../../Card/Card"
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import Select from "../../Input/Select";
import "./ShowSessionHistoryModal.css"

function ShowSessionHistoryModal({onClose}: {onClose: () => void}) {
  //TODO: Switch mocksessions to localstorage
  const { sessions, deleteSession, editSession } = useSessions()
  
  //State to know which session is being edited and to keep the data
  const [ editingId, setEditingId ] = useState<string>("")
  const [ editData, setEditData ] = useState<Session | null>(null)
  const [ editActiveTime, setEditActiveTime ] = useState<string>("")

  const makeMsReadable = useFormatTime()
  
  //Start edit mode
  const startEdit = (id: string) => {
    const incomingSession = sessions.find(s => s.id === id) //find which one to edit
    if(!incomingSession) return

    setEditData(incomingSession) //Save the current data
    setEditActiveTime(String(Math.round(incomingSession.msDuration / 60000))) //Change to human readable format (minutes)
    setEditingId(id)
  }

  //Use Session Context to update data and then leave edit mode
  const saveEdit = () => {
    if(!editData) return

    const finalMinutes = parseFloat(editActiveTime) || 0
    const newMs = finalMinutes * 60000

    const updatedSession = {
      ...editData,
      msDuration: newMs,
      activeTime: makeMsReadable(newMs)
    }

    editSession(updatedSession)
    setEditingId("")
    setEditData(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if(e.target.name === "msDuration") {
      setEditActiveTime(e.target.value)
    } else {
      setEditData(prev => prev ? { ...prev, [e.target.name]: e.target.value } : null)
    }
  }


  return(
    <Modal onClose={onClose}>
      <h2>Session History</h2>

      {sessions.length === 0 && <p className="empty-message">No saved sessions found.</p>}
      
      
      <div className="session-list">
        {sessions.map((session) => (
          //Check if editing mode is active or not for the specific session
          editingId === session.id ? (
            //editing mode
            <Card key={session.id}>
              <div className="content">

              <Input 
                label="Session Name"
                id="sessionName"
                name="sessionName"
                value={editData?.sessionName || ""}
                onChange={handleChange}
              />

              <Select 
                label="Category"
                id="category"
                name="category"
                value={editData?.category || ""}
                selectLabel="Select Category"
                onChange={handleChange}

                options={[
                  "Deep Work", 
                  "Admin", 
                  "Meeting", 
                  "Break", 
                  "Other"
                ]}
              />

              <Select 
                label="Productivity"
                id="productivity"
                name="productivity"
                value={editData?.productivity || ""}
                selectLabel="Select Productivity"
                onChange={handleChange}

                options={[
                  "1 - Poor", 
                  "2 - Fair", 
                  "3 - Good", 
                  "4 - Very Good", 
                  "5 - Excellent"
                ]}
              />

              <div className="time-edit-content">
                <Input
                  type="date"
                  label="Date"
                  name="date"
                  id="date"
                  value={editData?.date || ""}
                  onChange={handleChange}
                />

                <div className="button-row">
                  <Input
                    type="time"
                    label="Start Time"
                    name="startTime"
                    id="startTime"
                    value={editData?.startTime || ""}
                    onChange={handleChange}
                  />
                  <Input
                    type="time"
                    label="End Time"
                    name="endTime"
                    id="endTime"
                    value={editData?.endTime || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Input 
                type="number"
                label="Active Time (minutes)"
                name="msDuration"
                id="msDuration"
                value={editActiveTime}
                onChange={handleChange}
              />

              <div className="button-row">
                <Button
                  onClick={saveEdit}
                  size="small"
                >
                  Save
                </Button>

                <Button
                  onClick={() => { setEditingId(""); setEditData(null) }}
                  variant="secondary"
                  size="small"
                >
                  Cancel
                </Button>
              </div>

              </div>
            </Card>
          ) : (
            //not editing mode
            <Card key={session.id}>
              <div className="content">

                <h3>{session.sessionName || "Untitled Session"}</h3>

                <div>
                  <p className="category-text">{session.category}</p>
                  <p className="productivity-text">Productivity - {session.productivity.split('-')[1]}</p>
                </div>

                <p className="time-info">
                  <span>{session.date}</span>
                  <span className="separator">•</span>
                  <span>{session.startTime} - {session.endTime}</span>
                </p>

                {session.activeTime && <p className="active-time">Active time: {session.activeTime}</p>}

                <div className="button-row">
                  <Button
                    onClick={() => startEdit(session.id)}
                    size="small"
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() => deleteSession(session.id)}
                    variant="secondary"
                    size="small"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          )
        ))}
      </div>
    </Modal>
  )
}

export default ShowSessionHistoryModal