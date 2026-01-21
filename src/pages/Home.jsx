import Header from "../components/Header/Header"
import GridContainer from "../components/GridContainer/GridContainer"
import Card from "../components/Cards/Cards"

function Home() {
  return(
    <div className="main-container">
        <GridContainer columns={4}>
          <Card
            // Här hämtas tiden från historik
            title={"1h"}
            children={<p>Fokustid idag</p>}
          />

          <Card
            // Här hämtas tiden från historik
            title={"12h"}
            children={<p>Fokustid senaste veckan</p>}
          />

          <Card
            //Här dyker ett peppande citat upp
            title={<p>PEPP!!!</p>}
            span={2}
          />
        </GridContainer>

        <GridContainer columns={2} fullheight={true}>
          <Card
            title={<p>Starta timer</p>}
          />

          <Card
            title={<p>Uppgifter</p>}
            children={<p>Här listas uppgifter från ToDos</p>}
          />
        </GridContainer>
    </div>
  )
}

export default Home