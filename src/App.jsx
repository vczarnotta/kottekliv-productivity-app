import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage'
import TaskPage from  "./pages/TaskPage"
import TimerPage from "./pages/TimerPage"
import HistoryPage from "./pages/HistoryPage"

// Maps page names to components for dynamic rendering
const pages = {
  Home: <HomePage />,
  Tasks: <TaskPage />,
  Timer: <TimerPage />,
  History: <HistoryPage />
}

function App() {
  const [ activePage, setActivePage ] = useState("Home")

  return(
    <div className='body-container'>
      {/* The Header receives the function to change pages and the current active state */}
      <Header changePage={setActivePage} activePage={activePage}/>

      <main>
        {/* Renders the component that matches the current activePage state */}
        {pages[activePage]}
      </main>
    </div>
  )
}

export default App
