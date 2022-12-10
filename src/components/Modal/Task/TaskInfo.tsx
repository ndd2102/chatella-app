import { Modal, Label, TextInput, Button } from "flowbite-react";
import React, { useState } from "react";
import { Card } from "../../../types/card";

function TaskInfo(props: { card: Card; show: boolean }) {
  const card: Card = props.card;
  const initialState = {
    title: card.title,
    description: card.description,
    dueDate: card.dueDate,
    level: card.priority,
    assignedTo: card.assignedTo,
  };
  const [cardInfo, setCardInfo] = useState(initialState);
  return (
    <div>
      <React.Fragment>
        <Modal
          show={props.show}
          size="3xl"
          popup={true}
          onClose={() => (props.show = false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <Label value="Task Name" />
                  <TextInput
                    id="name"
                    name="name"
                    defaultValue={card.title}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label value="Task Description" />
                  <TextInput
                    id="description"
                    name="description"
                    defaultValue={card.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label value="Due date" />
                <TextInput
                  id="dueDate"
                  name="dueDate"
                  defaultValue={card.dueDate}
                  type="date"
                  onChange={handleChange}
                />
              </div>

              <Button onClick={onSubmit}>Confirm</Button>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </div>
  );

  function handleChange(event: { target: { name: any; value: any } }) {
    setCardInfo({
      ...cardInfo,
      [event.target.name]: event.target.value,
    });
  }
  function onSubmit() {}
}

export default TaskInfo;
