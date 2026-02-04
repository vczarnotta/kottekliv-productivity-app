import './Button.css'

/* Accepts primary, secondary and neutral variants, defaults is primary */
function Button({children, onClick, disabled, isSelected, variant="primary", size="base"}){
  return(
    <button 
    className={`button-base ${variant} ${size} ${isSelected ? "selected" : ""}`}
    onClick = {onClick}
    disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button