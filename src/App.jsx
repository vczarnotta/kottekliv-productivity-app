import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import TaskPage from  "./pages/TaskPage"
import TimerPage from "./pages/TimerPage"
import HistoryPage from "./pages/HistoryPage"

//Mappar sidnamn till komponenter för dynamisk rendering
const pages = {
  Home: <HomePage />,
  Dashboard: <DashboardPage />,
  Tasks: <TaskPage />,
  Timer: <TimerPage />,
  History: <HistoryPage />
}

function App() {
  const [ activePage, setActivePage ] = useState("Home")

  return(
    <div className='body-container'>
      {/* Header tar emot funktionen för att byta sida samt nuvarande status */}
      <Header changePage={setActivePage} activePage={activePage}/>

      <main>
        {/* Renderar den sida som matchar nuvarande state */}
        {pages[activePage]}
      </main>
    </div>
  )
}

export default App
