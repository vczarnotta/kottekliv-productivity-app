import { useState } from "react"
import GridContainer from "../components/GridContainer/GridContainer"
import Card from "../components/Card/Card"
import AddSessionModal from "../components/Modal/AddSessionModal/AddSessionModal"
import ShowHistorySessionModal from "../components/Modal/ShowHistorySessionModal/ShowHistorySessionModal"

function HistoryPage() {
  const [ showAddSession, setShowAddSession ] = useState(false)
  const [ showHistorySession, setShowHistorySession ] = useState(false)
  const [sessions, setSessions] = useState([]);

  const saveSession = (newSession) => {
    setSessions([...sessions, { ...newSession, id: Date.now() }]);
    /* TODO: Implement storage logic */
  };

  return(
    <div className="main-container">

      {/* Grid with 4 columns */}
      <GridContainer columns={4}>
        <Card 
          title={"Log Session"}
          children={<p>Manually log previous sessions and breaks.</p>}
          onClick={() => setShowAddSession(true)}
        />

        <Card
          title={"Edit History"}
          children={<p>Manage and correct your saved sessions.</p>}
          onClick={() => setShowHistorySession(true)}
        />

        <Card 
          title={"Performance peak"}
          children={<p>Displays the time of day when the user typically has the highest performance levels.</p>}
        />

        <Card 
          title={"Average Time Between Breaks"}
          children={<p>Helps the user understand if they need more frequent breaks during long sessions.</p>}
        />
      </GridContainer>

      {/* Grid with 1 column that takes up the remaining height */}
      <GridContainer columns={1} fullheight={true}>
        <Card 
          title={"Data Visualization"}
          children={<p>Placeholder for graphs. Should support switching between different views.</p>}
        />
      </GridContainer>

      {/* Pop-up rutor */}
      {showAddSession && (
        <AddSessionModal
          onClose={() => setShowAddSession(false)}
          onSave={saveSession}
        />
      )}

      {showHistorySession &&
        <ShowHistorySessionModal
          onClose={() => setShowHistorySession(false)}
        />
      }

    </div>
  )
}

export default HistoryPage