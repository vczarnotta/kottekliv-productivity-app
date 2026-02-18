import { useState } from "react"
import { Outlet, NavLink, useParams } from "react-router-dom"
import { useTodo } from "../../context/TodoContext"
import { ChevronRight, ChevronLeft, X } from "lucide-react"

import Card from "../../components/Card/Card"
import GridContainer from "../../components/GridContainer/GridContainer"
import "./TaskPage.css"

function TaskPage() {
  const { state, dispatch } = useTodo()
  const { listId } = useParams()
  
  const [isAdding, setIsAdding] = useState(false)
  const [newListTitle, setNewListTitle] = useState("")

  const handleCreateList = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newListTitle.trim() === "") return

    dispatch({ type: "CREATE_LIST", payload: newListTitle })
    setNewListTitle("")
  }

  const scroll = (offset: number) => {
    const nav = document.getElementById('todo-nav')!
    nav.scrollBy({ left: offset, behavior: 'smooth' })
  }

  //If listId is missing in url then we are in overview
  const showingOverview = !listId

  return(
    <div className="main-container">
      <GridContainer fullheight={true}>
        <Card>
          <div className="todo-container">
            <div className="nav-wrapper">
              <button onClick={() => scroll(-150)} className="nav-arrow"> <ChevronLeft /> </button>
                <nav id="todo-nav" className="todo-nav">
                  <NavLink to="/tasks" end className="todo-nav-item">Overview</NavLink>
                  {state.map((list) => (
                    <NavLink key={list.id} to={`/tasks/${list.id}`} className="todo-nav-item">
                      <span>{list.title}</span>
                      <button 
                        className="delete-list-button"
                        onClick={(e) => {
                          e.preventDefault()
                          if(window.confirm(`Are you sure you want to delete todo list "${list.title}"?`)) {
                            dispatch({ type: "DELETE_LIST", payload: list.id })
                          }
                        }}
                      >
                        <X />
                      </button>
                    
                    </NavLink>
                  ))}

                  {!isAdding ? (
                      <button 
                        className="add-list-btn" 
                        onClick={() => setIsAdding(true)}
                      >
                        +
                      </button>
                    ) : (
                      /* If isAdding is true, show form */
                      <form onSubmit={handleCreateList} className="create-list-form">
                        <input 
                          autoFocus
                          type="text" 
                          placeholder="Name your list..." 
                          value={newListTitle}
                          onChange={(e) => setNewListTitle(e.target.value)}
                          onBlur={() => !newListTitle && setIsAdding(false)} // Close if click outside and nothing is filled
                        />
                      </form>
                    )}
                </nav>
              <button onClick={() => scroll(150)} className="nav-arrow"> <ChevronRight  /> </button>
            </div>

            <h2>{state.find(list => list.id.toString() === listId)?.title || "Overview"}</h2>
            <Outlet />
          </div>
        </Card>
      </GridContainer>
    </div>
  )
}

export default TaskPage