import GridContainer from "../components/GridContainer/GridContainer"
import Button from "../components/Button/Button"
import Card from "../components/Card/Card"

function Dashboard() {
  return(
    <div className="main-container">
      <GridContainer columns={4}>
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