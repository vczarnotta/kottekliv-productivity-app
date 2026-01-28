import './Button.css'

/* Accepts primary and secondary variants, defaults is primary */
function Button({label, onClick, variant="primary"}){
  return(
    <button 
    className={`button-base ${variant}`}
    onClick = {onClick}
    >
      {label}
    </button>
  )
}

export default Button