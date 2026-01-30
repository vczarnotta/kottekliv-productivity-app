import { IoMdClose } from "react-icons/io";

import "./Modal.css"

/**
 * @param {function} onClose - Function to close the modal
 */
function Modal({children, onClose}) {

  const handleClickOutside = () => {
    onClose()
  }
  
  // Prevents clicks inside the modal from bubbling up to the overlay and closing the window
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