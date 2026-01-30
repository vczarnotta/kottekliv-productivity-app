import { useEffect, useState } from "react"
import "./ThemeToggle.css"
import Button from "../Button/Button"

import { CiDark, CiLight } from "react-icons/ci";

function ThemeToggle() {
  // If a value exists in localStorage, parse it from string to boolean, otherwise default to true
  const [ isLight, setIsLight ] = useState(() =>{
    const savedTheme = localStorage.getItem("theme")
    return savedTheme === null ? true : savedTheme === "true"
  })
  
  // Adds or removes the "dark" class from the #root element whenever state changes
  useEffect(() => {
    const root = document.querySelector("#root")
    isLight ? root.classList.remove("dark") : root.classList.add("dark")

    // Save the value in localStorage as a string
    localStorage.setItem("theme", isLight);
  }, [isLight])

  // Toggles the state when the button is clicked
  const handleTheme = () => {
    setIsLight(!isLight)
  }

  return(
    <Button 
      label={
        <span className="theme-toggle-content">
          {isLight ? 
            <>
              <CiDark /> Dark Mode
            </>
            : 
            <>
              <CiLight /> Light Mode
            </>}
        </span>
      }
      onClick={handleTheme}
      variant={"secondary"}
    />
  )
}

export default ThemeToggle