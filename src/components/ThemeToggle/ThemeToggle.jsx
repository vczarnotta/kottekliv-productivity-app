import { useEffect, useState } from "react"
import "./ThemeToggle.css"
import Button from "../Button/Button"

import { CiDark, CiLight } from "react-icons/ci";

function ThemeToggle() {
  // Om värde finns i localStorage, returnera från sträng till true/false annars true
  const [ isLight, setIsLight ] = useState(() =>{
    const savedTheme = localStorage.getItem("theme")
    return savedTheme === null ? true : savedTheme === "true"
  })
  
  //Lägger till och tar bort klassen dark från #root när state ändras
  useEffect(() => {
    const root = document.querySelector("#root")
    isLight ? root.classList.remove("dark") : root.classList.add("dark")

    // Spara värdet i localstorage som sträng
    localStorage.setItem("theme", isLight);
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