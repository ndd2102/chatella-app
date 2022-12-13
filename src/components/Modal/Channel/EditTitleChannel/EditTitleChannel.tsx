import { Button, Label, Modal, TextInput, Toast } from "flowbite-react";
import { Exclamation } from "heroicons-react";
import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { updateChannel } from "../../../../services/api";



function EditTitleChannel(props: {
    isHost: boolean;
  channelId: number;
}) {
  const [show, setShow] = useState(false);
  const [newChannelTitle, setNewChannelTitle] = useState("");

  return (
    <React.Fragment>
      <div className="flex items-center" onClick={() => setShow(true)}>
        <span className="bg-blue-50 p-2 text-2xl w-fit text-blue-700 hover:bg-blue-100 hover:cursor-pointer rounded-full">
          <AiOutlineUserAdd />
        </span>
        <span className="pl-2">Edit Title Channel</span>
      </div>
      <Modal show={show} size="md" popup={true} onClose={() => setShow(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit Title Channel
            </h3>
            <div>
              <div className="mb-2 block">
                <Label value="Tittle" />
              </div>
              <TextInput
                id="channelName"
                type="email"
                placeholder="Your New Channel title"
                required={true}
                onChange={(e) => {
                    setNewChannelTitle(e.target.value);
                }}
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
  );

  async function onSubmit() {
    if(props.isHost){
        await updateChannel(props.channelId, newChannelTitle);
    }
  }
}

export default EditTitleChannel;
