import { useState } from "react"
import { Outlet, NavLink, useParams } from "react-router-dom"
import { useTodo } from "../context/TodoContext"
import TodoList from "../components/Tasks/TodoListForm"

import Card from "../components/Card/Card"
import GridContainer from "../components/GridContainer/GridContainer"
import TodoListDisplay from "../components/Tasks/TodoListDisplay"

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

  //If listId is missing in url then we are in overview
  const showingOverview = !listId

  return(
    <div className="main-container">
      <nav>
        <NavLink to="/tasks" end>Overview</NavLink>
        {state.map((list) => (
          <NavLink key={list.id} to={`/tasks/${list.id}`} >{list.title}</NavLink>
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

      <GridContainer fullheight={true}>
        <Card>
          <h2>{state.find(list => list.id.toString() === listId)?.title || "Overview"}</h2>
          <Outlet />
        </Card>
      </GridContainer>
    </div>
  )
}

export default TaskPage