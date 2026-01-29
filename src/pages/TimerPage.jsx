import Timer from "../components/Timer/Timer"
import Input from "../components/Input/Input"
import { useState } from "react"

function TimerPage() {
  const [ sessionName, setSessionName ] = useState("Untitled Session")
  const [ category, setCategory ] = useState("")
  const [ isVisible, setIsVisible ] = useState(false)
  const [ currentId, setCurrentId ] = useState(null)

  return(
    <div className="main-container">
      <Input
        name={"sessionName"}
        placeholder="Add session name..."
      />

      <Input 
        name={"category"}
        type={"select"} 
        selectLabel={"Select Category"}
        defaultValue={""}

        options={[
          "Deep Work", 
          "Admin", 
          "Meeting", 
          "Break", 
          "Other"
        ]}
      />

      <Timer />
    </div>
  )
}

export default TimerPage