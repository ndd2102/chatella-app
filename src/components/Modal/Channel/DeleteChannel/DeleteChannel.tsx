import { Modal, Toast, Button } from "flowbite-react";
import { Exclamation } from "heroicons-react";
import React, { useState } from "react";
import { FiMinusSquare } from "react-icons/fi";
import { deleteChannel, deleteMember } from "../../../../services/api";

function DeleteChannel(props: {
  channelId: number;
  isHost: boolean;
  profileId: number;
}) {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  return (
    <React.Fragment>
      <div className="flex items-center" onClick={() => setShow(true)}>
        <span className="bg-red-50 p-2 text-2xl w-fit text-red-700 hover:bg-red-100 hover:cursor-pointer rounded-full">
          <FiMinusSquare />
        </span>
        <span className="pl-2">
          {props.isHost ? "Delete Channel" : "Leave channel"}
        </span>
      </div>
      <Modal show={show} size="xl" popup={true} onClose={() => setShow(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {props.isHost
                ? "Are you sure to delete this channel?"
                : "Are you sure to leave this channel?"}
            </h3>
            {error && (
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                  <Exclamation className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">{errorMessage}</div>
                <Toast.Toggle />
              </Toast>
            )}
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
                <Button color="failure" onClick={onSubmit}>
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
  async function onSubmit() {
    if (props.isHost) {
      await deleteChannel(props.channelId).catch((error) => {
        setError(true);
        setErrorMessage(error.response.data.error);
      });
    } else {
      await deleteMember(props.profileId, props.channelId).catch((error) => {
        setError(true);
        setErrorMessage(error.response.data.error);
      });
    }
    window.location.replace("/workspace");
  }
}
export default DeleteChannel;
