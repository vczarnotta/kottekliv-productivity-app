import { useEffect, useState } from "react"
import "./ThemeToggle.css"
import Button from "../Button/Button"

import { CiDark, CiLight } from "react-icons/ci";

function ThemeToggle() {
  const [ isLight, setIsLight ] = useState(true)
  
  //Lägger till och tar bort klassen dark från #root när state ändras
  useEffect(() => {
    const root = document.querySelector("#root")
    isLight ? root.classList.remove("dark") : root.classList.add("dark")
  }, [isLight])

  // Ändrar state när knappen trycks
  const handleTheme = () => {
    setIsLight(!isLight)
  }

  return(
    <Button 
      label={
        <span className="theme-toggle-content">
          {isLight ? 
            <>
              <CiDark /> Mörkt tema
            </>
            : 
            <>
              <CiLight /> Ljust tema
            </>}
        </span>
      }
      onClick={handleTheme}
      variant={"secondary"}
    />
  )
}

export default ThemeToggle