import GridContainer from "../components/GridContainer/GridContainer"
import Card from "../components/Card/Card"
import { TodoContext } from "../context/TodoContext"
import { useContext } from "react"
import TodoListDisplay from "../components/Tasks/TodoListDisplay"
import WelcomeMessage from "../components/WelcomeMessage/WelcomeMessage"

function HomePage() {
  const {totalItems} = useContext(TodoContext);

  return(
    <div className="main-container">
      <GridContainer>
        <WelcomeMessage />
      </GridContainer>
      
      {/* A 4-column grid for summary statistics and quote */}
      <GridContainer columns={4}>
        <Card
          title={"1h"}
          children={<p>Deep work today</p>}
        />

        <Card
          title={"12h"}
          children={<p>Deep work this week</p>}
        />

        {/* span={2} makes this card occupy two columns in the grid */}
        <Card
          title={"LET'S GO!"}
          span={2}
        />
      </GridContainer>

      {/* fullheight={true} stretches the container to fill the rest of the page */}
      <GridContainer columns={2} fullheight={true}>
        <Card
          title={"Start Timer"}
        />

        <Card
          title={`Tasks (${totalItems})`}
          children={
            <>
              <TodoListDisplay showDeleteButton={false}></TodoListDisplay>
            </>
          }
        />
      </GridContainer>
    </div>
  )
}

export default HomePage