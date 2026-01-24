import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Tasks from  "./pages/Tasks"
import Timer from "./pages/Timer"
import History from "./pages/History"

//Mappar sidnamn till komponenter för dynamisk rendering
const pages = {
  Home: <Home />,
  Dashboard: <Dashboard />,
  Tasks: <Tasks />,
  Timer: <Timer />,
  History: <History />
}

function App() {
  const [ activePage, setActivePage ] = useState("Tasks")

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
