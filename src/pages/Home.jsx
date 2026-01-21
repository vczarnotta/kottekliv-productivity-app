import Header from "../components/Header/Header"
import Card from "../components/Cards/Cards"

function Home() {
    return(
        <>
        <Header />
        <main>
            <Card
                // Här hämtas tiden från historik
                title={"1h"}
                description={"Fokustid idag"}
            />

            <Card
                // Här hämtas tiden från historik
                title={"12h"}
                description={"Fokustid senaste veckan"}
            />

            <Card
                //Här dyker ett peppande citat upp
                title={"PEPP!!!"}
            />

            <Card
                title={"Starta timer"}
            />

            <Card
                title={"Uppgifter"}
                description={"Här listas uppgifter från ToDos"}
            />
    
        </main>
        </>
    )
}

export default Home