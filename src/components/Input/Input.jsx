import './Input.css'
import { IoIosArrowDown } from "react-icons/io"

/**
 * @param {string} label - The text displayed above the field
 * @param {string} id - A unique ID to link the label and input
 * @param {string} type - Type of input (text, number, date, etc.)
 * @param {array} options - A list of objects for the dropdown menu (only used if type="select")
 */
const Input = ({label, id, type = 'text', options = [], ...rest}) => {

  return(
    <div className = "input-container">
      {label && <label htmlFor={id}>{label}</label>}

      {type === "select" ? (
        <div className='select-container'>
          <select id={id} defaultValue="">
            <option value="" disabled >Select {label}</option>

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