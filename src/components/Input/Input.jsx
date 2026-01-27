import './Input.css'

/**
 * @param {string} label - Texten som visas ovanför fältet
 * @param {string} id - Ett unikt ID för att koppla ihop label och input
 * @param {string} type - Typ av input (text, number, date, etc.)
 */
const Input = ({label, id, type = 'text', children, ...rest}) => {

  return(
    <div className = "input-container">
      {label && <label htmlFor={id}>{label}</label>}
      <input
      id={id}
      type={type}
      {...rest} />

      {children}
    </div>
  )
}

export default Input;