import { Avatar, Button, Checkbox, Label, Modal } from "flowbite-react";
import React, { useState } from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import { deleteMember } from "../../../../services/api";
import { Profile } from "../../../../types/profile";

function DeleteMember(props: { channelId: number; memberList: Profile[] }) {
  const [show, setShow] = useState(false);
  const [delMember, setDelMember] = useState<number[]>([]);

  return (
    <React.Fragment>
      <div className="flex items-center" onClick={() => setShow(true)}>
        <span className="bg-yellow-50 p-2 text-2xl w-fit text-yellow-700 hover:bg-yellow-100 hover:cursor-pointer rounded-full">
          <AiOutlineUserDelete />
        </span>
        <span className="pl-2">Delete Member</span>
      </div>
      <Modal show={show} size="md" popup={true} onClose={() => setShow(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Delete member
            </h3>
            <div>
              {props.memberList.slice(1).map((user, id) => (
                <div key={id} className="flex items-center gap-2 space-y-2">
                  <Checkbox onChange={handleChange} value={user.id} />
                  <Label className="flex gap-2 items-center ml-4 text-lg ">
                    <Avatar img={user.avatar} />
                    <div>{user.name}</div>
                  </Label>
                </div>
              ))}
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

  function handleChange(event: { target: { value: any } }) {
    let isCheck = event.target.value;
    const first = delMember.find((obj) => {
      return obj === isCheck;
    });
    console.log(first);
    if (first === undefined) {
      setDelMember((pre) => [...pre, isCheck]);
    } else
      setDelMember((member) =>
        member.filter((current) => {
          return current !== isCheck;
        })
      );
  }

  async function onSubmit() {
    delMember.map(async (value) => {
      await deleteMember(value, props.channelId).then(() =>
        window.location.reload()
      );
    });
    setShow(false);
  }
}
export default DeleteMember;
