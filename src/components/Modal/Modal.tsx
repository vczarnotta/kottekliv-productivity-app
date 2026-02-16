import { IoMdClose } from "react-icons/io";
import "./Modal.css"

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

function Modal({children, onClose}: ModalProps) {

  const handleClickOutside = () => {
    onClose()
  }
  
  // Prevents clicks inside the modal from bubbling up to the overlay and closing the window
  const stopClick = (e: React.MouseEvent) => {
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