import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Tasks from  "./pages/Tasks"
import Timer from "./pages/Timer"
import History from "./pages/History"

const pages = {
  Home: <Home />,
  Dashboard: <Dashboard />,
  Tasks: <Tasks />,
  Timer: <Timer />,
  History: <History />
}

function App() {
  const [ activePage, setActivePage ] = useState("Home")

  return(
    <div className='body-container'>
      <Header changePage={setActivePage} activePage={activePage}/>
      <main>
        {pages[activePage]}
      </main>
    </div>
  )
}

export default App
