import Modal from "../Modal";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import "./AddSessionModal.css"

function AddSessionModal({ onClose, onSave }) {

  const handleForm = (e) => {
    e.preventDefault()
    
    if (e.currentTarget.checkValidity()) {
      const formData = new FormData(e.currentTarget)
      const data = Object.fromEntries(formData.entries())
      onSave(data)
      onClose()
    }
  }

  return(
    <Modal onClose={onClose}>
      <h2>Log Session</h2>
      <form 
        action="submit"
        onSubmit={handleForm}
      >
        <Input 
          name={"sessionName"}
          id={"sessionName"}
          label={"Session Name"}
          placeholder={"e.g. Report writing, Planning..."}
        />

        <Input
          name={"category"}
          type={"select"} 
          label={"Category"}
          options={["Deep Work", "Admin", "Meeting", "Break", "Other"]}
        />

        <Input 
          name={"date"}
          type={"date"}
          label={"Date"}
          defaultValue={new Date().toISOString().split('T')[0]} // Default to today's date
        />

        <div className="time-container">
          <div className="time">
            <Input
              name={"startTime"}
              type="time"
              id="start-time"
              label="Start time"
            />
          </div>
          
          <div className="time">
            <Input 
              name={"endTime"}
              type="time"
              id="end-time"
              label="End time"
            />
          </div>
        </div>

        <Button 
          label={"Save session"}
          type={"submit"}
        />

      </form>
    </Modal>
  )
}

export default AddSessionModal