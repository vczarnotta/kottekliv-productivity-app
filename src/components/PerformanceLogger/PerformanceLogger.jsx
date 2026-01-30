import { useState } from "react"
import "./PerformanceLogger.css"

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
  const [performance, setPerformance] = useState(0)

  // Updates state and notifies parent component
  const handleClick = (level) => {

    // Toggle: deselect if the same level is clicked again
    const newLevel = performance === level ? 0 : level

    // Update state with the new level value
    setPerformance(newLevel)

    // Forward value to history if callback is provided and a selection is made
    onLevelSelect ? onLevelSelect(newLevel) : null
  }

  return(
    <div>
      <h3>How would you rate your performance during the session?</h3>

      <div className="button-group">
      {/* Generate a button for each performance level */}
      {performanceLevels.map((performanceLevel) => (
        <button
        className="button"
        key={performanceLevel.level}
        onClick={() => handleClick(performanceLevel.level)}
        >
            <span className="performance-level">{performanceLevel.level}</span>
            <span className="performance-description">{performanceLevel.description}</span>
        </button>
      ))}
      </div>

      {/* Verification display */}
      <p>Vald nivå: {performance > 0 ? performance : "ingen vald ännu"}</p>

    </div>
  )
}

export default PerformanceLogger