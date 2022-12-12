import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { createChannel } from "../../../../services/api";
import { FiPlusSquare } from "react-icons/fi";

export default function CreateChannel() {
  const [show, setShow] = useState(false);
  const [channelName, setChannelName] = useState("");

  return (
    <>
      <React.Fragment>
        <div
          onClick={() => setShow(true)}
          className="bg-blue-50 p-2 text-lg w-fit text-blue-700 hover:bg-blue-100 hover:cursor-pointer rounded-full"
        >
          <FiPlusSquare></FiPlusSquare>
        </div>
        <Modal
          show={show}
          size="xl"
          popup={true}
          id="UserInModal"
          onClose={() => setShow(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8 font-lexend">
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
    const newChannel = await createChannel(channelName);
    console.log(newChannel);
    window.location.replace(`/workspace/${newChannel.id}`);
    setShow(false);
  }
}
