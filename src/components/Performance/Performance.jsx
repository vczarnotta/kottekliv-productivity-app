import { useState } from "react"
import "./Performance.css"

function PerformanceLogger({onLevelSelect}) {
  // List of performance levels with descriptions
  const performanceLevels = [
    {level: 1, description: "Poor" },
    {level: 2, description: "Fair" },
    {level: 3, description: "Good" },
    {level: 4, description: "Very Good" },
    {level: 5, description: "Excellent" }
  ]

  // Local state to track the selected performance level
  const [performance, setPerformance] = useState("")

  // Updates state and notifies parent component
  const handleClick = (performanceLevels) => {
    // Update state with the new level value
    const newLevel = `${performanceLevels.level} - ${performanceLevels.description}`
    setPerformance(newLevel)

    // Forward value to history if callback is provided and a selection is made
    onLevelSelect ? onLevelSelect(newLevel) : null
  }



  return(
    <div>
      <h3>How would you rate your performance during the session?</h3>

      <div className="button-group">
      {/* Generate a button for each performance level */}
      {performanceLevels.map((performanceLevel) => {
        //To style the chosen button
        const isSelected = performance === `${performanceLevel.level} - ${performanceLevel.description}`

        return(
          <button
          className={`button ${isSelected ? "selected" : ""}`}
          key={performanceLevel.level}
          onClick={() => handleClick(performanceLevel)}
          >
              <span className="performance-level">{performanceLevel.level}</span>
              <span className="performance-description">{performanceLevel.description}</span>
          </button>
        )
      })}
      </div>

    </div>
  )
}

export default PerformanceLogger