import './Button.css'

/* Tar emot variant primary och secondary, default är primary */
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