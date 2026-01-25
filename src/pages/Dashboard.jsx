import GridContainer from "../components/GridContainer/GridContainer"
import Button from "../components/Button/Button"
import Card from "../components/Card/Card"

function Dashboard() {
  return(
    <div className="main-container">
      <p>Denna sida kan rensas, testade bara lägga in knapparna</p>
      <GridContainer columns={2}>
        <Button 
          label={"Klicka här"}
        />

        <Button 
          label={"Klicka här"}
          variant="secondary"
        />
      </GridContainer>
    </div>
  )
}

export default Dashboard