import useSessions from "../../../Hooks/useSession";

import Modal from "../Modal";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import "./AddSessionModal.css"

function AddSessionModal({ onClose }) {

  const { addSession } = useSessions()

  const handleForm = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    //add id to the data
    const newSession = { ...data, id: Date.now() }

    addSession(newSession)
    onClose()
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

        <div className="input-row">
          <Input
            name={"category"}
            type={"select"} 
            label={"Category*"}
            selectLabel={"Select Category"}
            defaultValue={""}
            required

            options={[
              "Deep Work", 
              "Admin", 
              "Meeting", 
              "Break", 
              "Other"
            ]}
          />

          <Input
            name={"performance"} 
            type={"select"}
            label={"Performance*"}
            selectLabel={"Select Performance"}
            defaultValue={""}
            required

            options={[
              "1 - Poor", 
              "2 - Fair", 
              "3 - Good", 
              "4 - Very Good", 
              "5 - Excellent"
            ]}
          />
        </div>
        

        <Input 
          name={"date"}
          type={"date"}
          label={"Date*"}
          defaultValue={new Date().toISOString().split('T')[0]} // Default to today's date
          required
        />

        <div className="input-row">
            <Input
              name={"startTime"}
              type="time"
              id="start-time"
              label="Start Time*"
              required
            />
          
            <Input 
              name={"endTime"}
              type="time"
              id="end-time"
              label="End Time*"
              required
            />
        </div>

        <Button 
          label={"Save Session"}
          type={"submit"}
        />

        <p className="required-info">* Required fields</p>
      </form>
    </Modal>
  )
}

export default AddSessionModal