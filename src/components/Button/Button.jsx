import React from 'react';
import './Button.css'

function MyButton({children, onClick, isDarkMode = false, ...props }){
  const themeClass = isDarkMode ? 'btn-dark' : 'btn-light';
  return(
    <button 
    className={`btn-base ${themeClass}`}
    onClick = {onClick}
    > {children}
    </button>
  )
}

export default MyButton