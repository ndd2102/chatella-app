import { Button, Label, Modal, TextInput, Toast } from "flowbite-react";
import { Exclamation } from "heroicons-react";
import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { addMember } from "../../../../services/api";
import { Profile } from "../../../../types/profile";

function AddMember(props: {
  memberList: Profile[] | undefined;
  channelId: number;
}) {
  const [show, setShow] = useState(false);
  const [newMember, setNewMember] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  return (
    <React.Fragment>
      <div className="flex items-center" onClick={() => setShow(true)}>
        <span className="bg-blue-50 p-2 text-2xl w-fit text-blue-700 hover:bg-blue-100 hover:cursor-pointer rounded-full">
          <AiOutlineUserAdd />
        </span>
        <span className="pl-2">Add Member</span>
      </div>
      <Modal show={show} size="md" popup={true} onClose={() => setShow(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add member
            </h3>
            <div>
              <div className="mb-2 block">
                <Label value="Email" />
              </div>
              <TextInput
                id="channelName"
                type="email"
                placeholder="name@company.com"
                required={true}
                onChange={(e) => {
                  setError(false);
                  setNewMember(e.target.value);
                }}
              />
            </div>
            {error && (
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                  <Exclamation className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">{errorMessage}</div>
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
                <Button onClick={onSubmit}>Confirm</Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );

  async function onSubmit() {
    const checkDuplicate = props.memberList?.find((members) => {
      return members.email === newMember;
    });

    if (checkDuplicate !== undefined) {
      setError(true);
      setErrorMessage("This member is already in channel!");
    } else {
      await addMember(newMember, props.channelId)
        .then(() => window.location.reload())
        .catch((error) => {
          setError(true);
          setErrorMessage("Email not found!");
        });
    }
  }
}

export default AddMember;
