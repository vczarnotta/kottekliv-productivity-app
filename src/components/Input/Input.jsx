import './Input.css'
import { IoIosArrowDown } from "react-icons/io"

/**
 * @param {string} label - Texten som visas ovanför fältet
 * @param {string} id - Ett unikt ID för att koppla ihop label och input
 * @param {string} type - Typ av input (text, number, date, etc.)
 * @param {array} options - En lista med objekt för dropdown-menyn (används endast om type="select")
 */
const Input = ({label, id, type = 'text', options = [], ...rest}) => {

  return(
    <div className = "input-container">
      {label && <label htmlFor={id}>{label}</label>}

      {type === "select" ? (
        <div className='select-container'>
          <select id={id}>
            <option value="" disabled selected>Välj {label}</option>

            {options.map((option, index) => (
              <option key={index}>
                {option}
              </option>
            ))}
          </select>
          <IoIosArrowDown className="select-icon" />
        </div>
      ) : (
        <>
          <input
            id={id}
            type={type}
            {...rest}
          />
        </>
      )}
      
    </div>
  )
}

export default Input;