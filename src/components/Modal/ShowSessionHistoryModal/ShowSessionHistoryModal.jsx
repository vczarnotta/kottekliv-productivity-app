import { useState } from "react";
import Modal from "../Modal";
import mockSessions from "./mockSessions";
import Card from "../../Card/Card"
import Button from "../../Button/Button";
import "./ShowSessionHistoryModal.css"

function ShowSessionHistoryModal({onClose}) {
  //TODO: Switch mocksessions to localstorage
  const [sessions, setSessions] = useState(mockSessions)
  
  //State to know which session is being edited
  const [ editingId, setEditingId ] = useState(null)
  
  const editSession = (id) => {
    setEditingId(id)
  }

  //TODO: add logic for when in edit mode

  const deleteSession = (id) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      const updatedSessions = sessions.filter(session => session.id !== id);
      setSessions(updatedSessions);

      //TODO: Update localstorage here
    }
  }

  return(
    <Modal onClose={onClose}>
      <h2>Session History</h2>
      
      
      <div className="session-list">
        {sessions.map((session) => (
          //Check if editing mode is active or not for the specific session
          editingId === session.id ? (
            //editing mode
            <Card>
              {/* Just to see edit mode works */}
              <p>{session.sessionName || "Untitled Session"} is in edit mode</p>
            </Card>
          ) : (
            //not editing mode
            <Card key={session.id}>
              <div className="content">

                <h3>{session.sessionName || "Untitled Session"}</h3>

                <div>
                  <p className="category-text">{session.category}</p>
                  <p className="performance-text">Performance - {session.performance.split('-')[1]}</p>
                </div>

                <p className="time-info">
                  <span>{session.date}</span>
                  <span className="separator">•</span>
                  <span>{session.startTime} - {session.endTime}</span>
                </p>

                <div className="button-row">
                  <Button
                    label="Edit"
                    onClick={() => editSession(session.id)}
                    size="small"
                  />

                  <Button
                    label="Delete"
                    onClick={() => deleteSession(session.id)}
                    variant="secondary"
                    size="small"
                  />
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