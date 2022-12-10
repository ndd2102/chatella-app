import { number } from "decoders";
import { Avatar, Button, Checkbox, Label, Modal, Toast } from "flowbite-react";
import { Exclamation } from "heroicons-react";
import React, { useEffect, useState } from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import {
  addMember,
  deleteMember,
  getChannel,
  getUserProfile,
} from "../../../../services/api";
import { Channel, ChannelMember } from "../../../../types/channel";
import { Profile } from "../../../../types/profile";

function DeleteMember(props: { channelInfo: Channel }) {
  const [show, setShow] = useState(false);
  const [member, setMember] = useState<Profile[]>([]);
  const [delMember, setDelMember] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setLoad] = useState(true);

  useEffect(() => {
    if (!isLoading) return;
    const fetchUserlList = async () => {
      const list = await Promise.all(
        props.channelInfo.members.map(async (value) => {
          return await getUserProfile(value.userId);
        })
      );
      setMember(list);
      setLoad(false);
    };
    fetchUserlList();
  }, [isLoading, props.channelInfo.members]);

  return (
    <React.Fragment>
      <span
        onClick={() => setShow(true)}
        className="bg-blue-50 p-2 text-3xl w-fit text-blue-700 hover:bg-blue-100 hover:cursor-pointer rounded-full"
      >
        <AiOutlineUserDelete></AiOutlineUserDelete>
      </span>
      <Modal show={show} size="md" popup={true} onClose={() => setShow(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8 font-lexend">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Delete member
            </h3>
            <div>
              {member.map((userId, id) => (
                <div key={id}>
                  <Label className="inline-flex justify-center items-center ml-4 text-lg ">
                    <Avatar img={userId.avatar} />
                    <div>{userId.name}</div>
                  </Label>
                  <Checkbox
                    className="float-right"
                    onChange={handleChange}
                    value={userId.id}
                  />
                </div>
              ))}
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
                <Button onClick={check}>Confirm</Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
  function handleChange(event: { target: { value: any } }) {
    let isCheck = event.target.value;
    setDelMember((pre) => [...pre, isCheck]);
  }
  function check() {
    console.log(delMember);
  }
  async function getUserInfo(userId: number) {
    let a = await getUserProfile(userId);
    return a.name;
  }
  //   async function memberInChannel(emailAdd: string, channelId: number) {
  //     let emailUser = "";
  //     let memberChannel = (await getChannel(channelId)).members;
  //     for (let i = 0; i < memberChannel.length; i++) {
  //       emailUser = (await getUserProfile(memberChannel[i].userId)).email;
  //       if (emailAdd === emailUser) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   }

  //   async function onSubmit() {
  //     // if (await memberInChannel(newMember, props.channelId)) {
  //     //   setError(true);
  //     //   setErrorMessage("This member is already in channel!");
  //     // }
  //     await DeleteMember(newMember, props.channelId).catch((error) => {
  //       setError(true);
  //       setErrorMessage("Email not found!");
  //     });

  //     if (!error) {
  //       setShow(false);
  //     }
  //   }
}

export default DeleteMember;
