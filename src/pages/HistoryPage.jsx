import { useState } from "react"
import GridContainer from "../components/GridContainer/GridContainer"
import Card from "../components/Card/Card"
import AddSessionModal from "../components/AddSessionModal/AddSessionModal"

function HistoryPage() {
  const [ showAddSession, setShowAddSession ] = useState(false)
  const [ showHistorySession, setShowHistorySession ] = useState(false)
  const [sessions, setSessions] = useState([]);

  const saveSession = (newSession) => {
    setSessions([...sessions, { ...newSession, id: Date.now() }]);
    /* Behöver läggas till i historiklistan på något vis... */
  };

  return(
    <div className="main-container">

      {/* Grid med 4 kolumner */}
      <GridContainer columns={4}>
        <Card 
          title={"Logga pass"}
          children={<p>Här är en knapp som leder till att skapa ett pass i efterhand</p>}
          onClick={() => setShowAddSession(true)}
        />

        <Card
          title={"Redigera historik"}
          children={<p>Här kan man klicka och komma till en lista med historiska pass</p>}
          onClick={() => setShowHistorySession(true)}
        />

        <Card 
          title={"Energitoppen"}
          children={<p>Här visas vilken tid användaren har bäst energi i snitt</p>}
        />

        <Card 
          title={"Genomsnittlig tid mellan pauser"}
          children={<p>Hjälper användaren förstå om han/hon behöver ta paus oftare pga för långa pass</p>}
        />
      </GridContainer>

      {/* Grid med 2 kolumner som tar upp all resterande höjd */}
      <GridContainer columns={1} fullheight={true}>
        <Card 
          title={"Visar en graf"}
          children={<p>Ska gå att ändra mellan olika vyer</p>}
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
        <showHistorySessionModal
          onClose={() => setShowHistorySession(false)}
        />
      }

    </div>
  )
}

export default HistoryPage