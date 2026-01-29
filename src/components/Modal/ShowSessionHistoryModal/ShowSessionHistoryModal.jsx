import { useState } from "react";
import useSessions from "../../../Hooks/useSession";

import Modal from "../Modal";
import Card from "../../Card/Card"
import Button from "../../Button/Button";
import "./ShowSessionHistoryModal.css"

function ShowSessionHistoryModal({onClose}) {
  //TODO: Switch mocksessions to localstorage
  const { sessions, deleteSession, editSession } = useSessions()
  
  //State to know which session is being edited and to keep the data
  const [ editingId, setEditingId ] = useState(null)
  const [ editData, setEditData ] = useState(null)
  
  //Start edit mode
  const startEdit = (id) => {
    setEditingId(id)
  }

  //Use Session Context to update data and then leave edit mode
  const saveEdit = () => {
    editSession()
    setEditingId(null)
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
                    onClick={() => startEdit(session.id)}
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