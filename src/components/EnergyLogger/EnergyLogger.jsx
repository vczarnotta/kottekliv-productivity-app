import { useState } from "react"
import "./EnergyLogger.css"

function EnergyLogger({onLevelSelect}) {
  // Lista över tillgängliga energinivåer med tillhörande beskrivningar
  const energyLevels = [
    {level: 1, description: "Mycket låg" },
    {level: 2, description: "Låg" },
    {level: 3, description: "Medel" },
    {level: 4, description: "Hög" },
    {level: 5, description: "Mycket Hög" }
  ]

  // Lokal state för att hålla koll på vilken nivå som är vald
  const [energy, setEnergy] = useState(0)

  //Uppdaterar både lokal state och informerar föräldrakomponenten vid klick på energinivå-knapp
  const handleClick = (level) => {

    //Om man klickar på samma knapp igen ska den avväljas annars sätt till level
    const newLevel = energy === level ? 0 : level

    // Uppdatera state med det nya värdet
    setEnergy(newLevel)

    // Skickar värdet vidare så att det kan sparas i historiken, om funktionen finns och något värde är valt
    onLevelSelect ? onLevelSelect(newLevel) : null
  }

  return(
    <div>
      <h3>Hur var din energinivå under passet?</h3>

      <div className="button-group">
      {/* Skapa en knapp för varje energinivå */}
      {energyLevels.map((energyLevel) => (
        <button
        className="button"
        key={energyLevel.level}
        onClick={() => handleClick(energyLevel.level)}
        >
            <span className="energy-level">{energyLevel.level}</span>
            <span className="energy-description">{energyLevel.description}</span>
        </button>
      ))}
      </div>

      {/*För kontroll att det fungerar*/}
      <p>Vald nivå: {energy > 0 ? energy : "ingen vald ännu"}</p>

    </div>
  )
}

export default EnergyLogger