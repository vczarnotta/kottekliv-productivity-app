import './Button.css'

/* Accepts primary and secondary variants, defaults is primary */
function Button({children, onClick, variant="primary", size="medium"}){
  return(
    <button 
    className={`button-base ${variant} ${size}`}
    onClick = {onClick}
    >
      {children}
    </button>
  )
}

export default Button