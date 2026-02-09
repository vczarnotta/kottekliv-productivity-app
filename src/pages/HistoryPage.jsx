import { useState } from "react"
import GridContainer from "../components/GridContainer/GridContainer"
import Card from "../components/Card/Card"
import StatsGraph from "../components/StatsGraph/StatsGraph"
import AddSessionModal from "../components/Modal/AddSessionModal/AddSessionModal"
import ShowSessionHistoryModal from "../components/Modal/ShowSessionHistoryModal/ShowSessionHistoryModal"

function HistoryPage() {
  const [ showAddSession, setShowAddSession ] = useState(false)
  const [ showSessionHistory, setShowSessionHistory ] = useState(false)
  const [ sessions, setSessions ] = useState([]);

  const saveSession = (newSession) => {
    setSessions([...sessions, { ...newSession, id: Date.now() }]);
    /* TODO: Implement storage logic */
  };

  return(
    <div className="main-container">

      {/* Grid with 4 columns */}
      <GridContainer columns={2}>
        <Card 
          title={"Log Session"}
          children={<p>Manually log previous sessions and breaks.</p>}
          onClick={() => setShowAddSession(true)}
        />

        <Card
          title={"Edit History"}
          children={<p>Manage and correct your saved sessions.</p>}
          onClick={() => setShowSessionHistory(true)}
        />

      </GridContainer>

      {/* Grid with 1 column that takes up the remaining height */}
      <GridContainer columns={1} fullheight={true}>
        <Card 
          title={<div style={{ textAlign: "center", width: "100%" }}>Data Visualization</div>}
          children={<StatsGraph />}    
        />
      </GridContainer>

      {/* Pop-up rutor */}
      {showAddSession && (
        <AddSessionModal
          onClose={() => setShowAddSession(false)}
          onSave={saveSession}
        />
      )}

      {showSessionHistory &&
        <ShowSessionHistoryModal
          onClose={() => setShowSessionHistory(false)}
        />
      }

    </div>
  )
}

export default HistoryPage