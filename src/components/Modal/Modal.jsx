import { IoMdClose } from "react-icons/io";

import "./Modal.css"

/**
 * @param {function} onClose - Funktionen som stänger fönstret
 */
function Modal({children, onClose}) {

  const handleClickOutside = () => {
    onClose()
  }
  
  //Stoppar klick inne i modalen från att vandra ner till overlay och stänga fönstret
  const stopClick = (e) => {
    e.stopPropagation()
  }

  return(
    <div className="overlay" onClick={handleClickOutside}>
      <div className="container" onClick={stopClick}>
        <button
          className="close-button"
          onClick={onClose}
        >
          <IoMdClose /> 
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal