import GridContainer from "../components/GridContainer/GridContainer"
import Card from "../components/Card/Card"

function History() {
  return(
    <div className="main-container">

      {/* Grid med 4 kolumner */}
      <GridContainer columns={4}>
        <Card 
          title={"Logga pass"}
          children={<p>Här är en knapp som leder till att skapa ett pass i efterhand</p>}
        />

        <Card
          title={"Redigera historik"}
          children={<p>Här kan man klicka och komma till en lista med historiska pass</p>}
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
      <GridContainer columns={2} fullheight={true}>
        <Card 
          title={"Visar en graf"}
          children={<p>Exempelvis över arbetad tid per dag</p>}
        />

        <Card 
          title={"Visar en graf"}
          children={<p>Exempelvis över energinivå</p>}
        />
      </GridContainer>

    </div>
  )
}

export default History