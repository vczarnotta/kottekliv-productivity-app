import GridContainer from "../components/GridContainer/GridContainer"
import Card from "../components/Card/Card"
import { TodoContext } from "../context/TodoContext"
import { useContext } from "react"
import TodoListDisplay from "../components/Tasks/TodoListDisplay"

function Home() {
  const {state, totalItems} = useContext(TodoContext);

  return(
    <div className="main-container">
        {/* En grid med 4 kolumner för sammanfattande statistik */}
        <GridContainer columns={4}>
          <Card
            title={"1h"}
            children={<p>Fokustid idag</p>}
          />

          <Card
            title={"12h"}
            children={<p>Fokustid senaste veckan</p>}
          />

          {/* span={2} gör att detta kort tar upp två kolumner i gridden */}
          <Card
            title={"PEPP!!!"}
            span={2}
          />
        </GridContainer>

        {/* fullheight={true} sträcker ut containern för att fylla resten av sidan */}
        <GridContainer columns={2} fullheight={true}>
          <Card
            title={"Starta timer"}
          />

          <Card
            title={`Uppgifter (${totalItems})`}
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

export default Home