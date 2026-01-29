import Timer from "../components/Timer/Timer"
import Input from "../components/Input/Input"

function TimerPage() {
  return(
    <div className="main-container">
      <Input
        placeholder=""
      />

      <Timer />
    </div>
  )
}

export default TimerPage