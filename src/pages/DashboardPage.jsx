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
        <Button>
          Click here
        </Button>

        <Button variant="secondary">
          Click here
        </Button>

      </GridContainer>
    </div>
  )
}

export default DashboardPage