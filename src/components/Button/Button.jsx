import './Button.css'

/* Accepts primary and secondary variants, defaults is primary */
function Button({label, onClick, variant="primary", size="medium"}){
  return(
    <button 
    className={`button-base ${variant} ${size}`}
    onClick = {onClick}
    >
      {label}
    </button>
  )
}

export default Button