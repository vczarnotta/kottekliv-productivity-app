import GridContainer from "../components/GridContainer/GridContainer"
import Card from "../components/Card/Card"
import { TodoContext } from "../context/TodoContext"
import { useContext } from "react"
import TodoListDisplay from "../components/Tasks/TodoListDisplay"
import WelcomeMessage from "../components/WelcomeMessage/WelcomeMessage"
import useSessions from "../hooks/useSession"
import useFormatTime from "../hooks/useFormatTime"

import StatsGraph from "../components/StatsGraph/StatsGraph"
import Quote from "../components/Quote/Quote"

function HomePage() {
  // --- hooks ---
  const { totalItems } = useContext(TodoContext);
  const { sessions } = useSessions();
  const makeMsReadable = useFormatTime();

  console.log(sessions[0]?.msDuration)

  // ---- calculations/logic ----

  // define "TODAY" for accurate filter
  const today = new Date().toISOString().split("T")[0];
  console.log("1: " + today)

  // remove everything that isn't "today" AND "Deep Work"
  const todaySessions = sessions.filter(s => 
    s.date === today && s.category === "Deep Work"
  );
  console.log("2: " + todaySessions)
  // add upp all ms for "today"
  const totalMsToday = todaySessions.reduce((sum, s) => sum + s.msDuration, 0);
  console.log("3: " + totalMsToday)
  // human format
  const timeToday = makeMsReadable(totalMsToday);

  // datum för "måndag denna veckan" (så vi kan ta alla datum efter det)
  const todayDate = new Date();
  const dayOfWeek = todayDate.getDay();
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(todayDate);
  monday.setDate(todayDate.getDate() - daysFromMonday);
  const mondayStr = monday.toISOString().split("T")[0];

  // den kör "lexikografiskt (alfabetisk ordning)" -> så går att jämföra strings, för 2026-01-03 är före 2026-01-05 i alfabetet. coolt.
  const weekSessions = sessions.filter(s => 
    s.date >= mondayStr && s.category === "Deep Work"
  );

  // total ms för veckan
  const totalMsWeek = weekSessions.reduce((sum, s) => sum + s.msDuration, 0);

  // human format
  const timeWeek = makeMsReadable(totalMsWeek);

  console.log(timeToday)

  // ---- HTML ----

  return(
    <div className="main-container">
      <GridContainer>
        <WelcomeMessage />
      </GridContainer>
      
      {/* A 4-column grid for summary statistics and quote */}
      <GridContainer columns={4}>
        <Card
          title={timeToday}
          children={<p>Deep work today</p>}
        />

        <Card
          title={timeWeek}
          children={<p>Deep work this week</p>}
        />

        {/* span={2} makes this card occupy two columns in the grid */}
        <Card
          children={<Quote />}
          span={2}
        />
      </GridContainer>

      {/* fullheight={true} stretches the container to fill the rest of the page */}
      <GridContainer columns={2} fullheight={true}>
        <Card
          title={"Statistics"}
          children={<StatsGraph />}
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