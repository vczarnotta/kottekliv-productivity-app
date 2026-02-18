import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage'
import TaskPage from  "./pages/TaskPage"
import TodoListDisplay from './components/Tasks/TodoListDisplay'
import TimerPage from "./pages/TimerPage/TimerPage"
import HistoryPage from "./pages/HistoryPage"
import NotFound from './pages/NotFound/NotFound'
import './App.css'
import TodoList from './components/Tasks/TodoListForm'

function App() {
  return(
    <div className='body-container'>
      <Header />

      <main>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/Tasks' element={<TaskPage/>}>
            <Route index element={<TodoListDisplay isOverview={true} />}/>
            <Route path=':listId' element={<><TodoListDisplay isOverview={false} /><TodoList /></>}/>
          </Route>
          <Route path='/Timer' element={<TimerPage/>} />
          <Route path='/History' element={<HistoryPage/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
