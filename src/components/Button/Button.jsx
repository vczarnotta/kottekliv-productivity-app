import './Button.css'

/* Accepts primary and secondary variants, defaults is primary */
function Button({children, onClick, disabled, variant="primary", size="medium"}){
  return(
    <button 
    className={`button-base ${variant} ${size}`}
    onClick = {onClick}
    disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button