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
      <h2>Logga arbetspass</h2>
      <form 
        action="submit"
        onSubmit={handleForm}
      >
        <Input 
          name={"sessionName"}
          id={"sessionName"}
          label={"Namnge pass"}
          placeholder={"Namnge passet..."}
        />

        <Input
          name={"category"}
          type={"select"} 
          label={"Kategori"}
          options={["Fokusarbete", "Admin", "Möte", "Paus", "Övrigt"]}
        />

        <Input 
          name={"date"}
          type={"date"}
          label={"Datum"}
          defaultValue={new Date().toISOString().split('T')[0]} //Default dagens datum
        />

        <div className="time-container">
          <div className="time">
            <Input
              name={"startTime"}
              type="time"
              id="start-time"
              label="Starttid"
            />
          </div>
          
          <div className="time">
            <Input 
              name={"endTime"}
              type="time"
              id="end-time"
              label="Sluttid"
            />
          </div>
        </div>

        <Button 
          label={"Spara"}
          type={"submit"}
        />

      </form>
    </Modal>
  )
}

export default AddSessionModal