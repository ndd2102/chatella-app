import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChannel } from "../../../services/api";

export default function CreateChannel() {
  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <React.Fragment>
        <Button gradientMonochrome="info" onClick={() => setShow(true)}>
          Create
        </Button>
        <Modal
          show={show}
          size="xl"
          popup={true}
          id="UserInModal"
          onClose={() => setShow(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Create new channel
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label value="Channel Name" />
                </div>
                <TextInput
                  id="channelName"
                  onChange={(e) => {
                    setChannelName(e.target.value);
                  }}
                  required={true}
                />
              </div>
              <div className="flex flex-wrap gap-6 my-auto">
                <div className="ml-auto flex flex-wrap gap-6">
                  <Button
                    color="gray"
                    onClick={() => {
                      setShow(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={onSubmit}>Confirm</Button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </>
  );

  async function onSubmit() {
    await createChannel(channelName);
    // navigate("/channel");
  }
}
