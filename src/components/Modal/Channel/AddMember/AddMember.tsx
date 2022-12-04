import { Button, Label, Modal, TextInput, Toast } from "flowbite-react";
import { Exclamation } from "heroicons-react";
import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { addMember, getChannel, getUserProfile } from "../../../../services/api";
import { ChannelMember } from "../../../../types/channel";

function AddMember(props: { channelId: number; memberList: ChannelMember[] }) {
  const [show, setShow] = useState(false);
  const [newMember, setNewMember] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  return (
    <React.Fragment>
      <span
        onClick={() => setShow(true)}
        className="bg-blue-50 p-2 text-3xl w-fit text-blue-700 hover:bg-blue-100 hover:cursor-pointer rounded-full"
      >
        <AiOutlineUserAdd></AiOutlineUserAdd>
      </span>
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
                <Button onClick={onSubmit}>Confirm</Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );

  async function memberInChannel(emailAdd: string, channelId:number )
  {
    let emailUser="";
    let memberChannel = (await getChannel(channelId)).members;
    for( let i= 0; i < 2; i++){
      emailUser = (await getUserProfile(memberChannel[i].userId)).email;
      if(emailAdd === emailUser){
        return true;
      }
    }
    return false;
  }

  async function onSubmit() {
    if(await memberInChannel(newMember, props.channelId))
    {
      setError(true);
      setErrorMessage("This member is already in channel!");
    }
    await addMember(newMember, props.channelId).catch((error) => {
      setError(true);
      setErrorMessage("Email not found!");
    });

    if (!error) {
      setShow(false);
    }
  }
}
  

export default AddMember;
