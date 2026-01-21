import Header from "../components/Header/Header"
import Card from "../components/Cards/Cards"

function Dashboard() {
  return(
    <div className="main-container">
        <Card 
          // Lägg koppling till antalet tasks här
          title={"0/0"}
          description={"Uppgifter"}
        />
        <Card 
          title={"Titel"}
          description={"Beskrivning"}
        />
    </div>
  )
}

export default Dashboard