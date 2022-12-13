import { Button, Label, Modal, TextInput, Toast } from "flowbite-react";
import { Exclamation } from "heroicons-react";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { updateChannelTitle } from "../../../../pages/Workspace/Workspace.slice";
import { updateChannel } from "../../../../services/api";
import { store } from "../../../../state/store";

function EditTitleChannel(props: { isHost: boolean; channelId: number }) {
  const [show, setShow] = useState(false);
  const [newChannelTitle, setNewChannelTitle] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <React.Fragment>
      <div className="flex items-center" onClick={() => setShow(true)}>
        <span className="bg-indigo-50 p-2 text-2xl w-fit text-indigo-700 hover:bg-indigo-100 hover:cursor-pointer rounded-full">
          <AiOutlineEdit />
        </span>
        <span className="pl-2">Edit Channel Title</span>
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
              {error && (
                <Toast>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                    <Exclamation className="h-5 w-5" />
                  </div>
                  <div className="ml-3 text-sm font-normal">{errorMessage}</div>
                  <Toast.Toggle />
                </Toast>
              )}
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
    if (props.isHost) {
      store.dispatch(
        updateChannelTitle({
          newChannelTitle: newChannelTitle,
          idChannel: props.channelId,
        })
      );
      setShow(false);
      await updateChannel(props.channelId, newChannelTitle);
    }
  }
}

export default EditTitleChannel;
