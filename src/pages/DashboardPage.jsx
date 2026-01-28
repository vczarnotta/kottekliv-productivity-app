import GridContainer from "../components/GridContainer/GridContainer"
import Button from "../components/Button/Button"
import Card from "../components/Card/Card"

function DashboardPage() {
  return(
    <div className="main-container">
      <Card 
        children={<p>This page can be cleared, just testing the buttons</p>}
      />
      <GridContainer columns={2}>
        <Button 
          label={"Click here"}
        />

        <Button 
          label={"Click here"}
          variant="secondary"
        />
      </GridContainer>
    </div>
  )
}

export default DashboardPage