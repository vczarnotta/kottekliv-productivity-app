import Modal from "../Modal";
import mockSessions from "./mockSessions";
import Card from "../../Card/Card"
import Button from "../../Button/Button";
import "./ShowHistorySessionModal.css"

function ShowHistorySessionModal({onClose}) {
  const editSession = () => {

  }

  const deleteSession = () => {

  }

  return(
    <Modal onClose={onClose}>
      <h2>Session History</h2>
      
      
      <div className="session-list">
        {mockSessions.map((session) => (
          <div>
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
                    onClick={editSession}
                    size="small"
                  />

                  <Button
                    label="Delete"
                    onClick={deleteSession}
                    variant="secondary"
                    size="small"
                  />
                </div>
              </div>
            </Card>

          </div>
        ))}
      </div>
    </Modal>
  )
}

export default ShowHistorySessionModal