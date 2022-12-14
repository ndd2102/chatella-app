import React, { useState } from "react";
import { Avatar, Label, Modal, TextInput } from "flowbite-react";
import { AiTwotoneStar } from "react-icons/ai";
import { Profile } from "../../../types/profile";
import { Channel } from "../../../types/channel";
import { format } from "date-fns";
export function MemberProfile(props: { profile: Profile; channel: Channel }) {
  const [show, setShow] = useState(false);
  const dateOfBirth = format(new Date(props.profile.dateOfBirth), "dd/MM/yyyy");

  return (
    <>
      <React.Fragment>
        <div
          className="flex items-center p-2 hover:text-blue-400 hover:cursor-pointer rounded-lg"
          onClick={() => setShow(true)}
        >
          <span>
            <Avatar img={props.profile.avatar} className="pr-6" />
          </span>
          <span className="pl-2">{props.profile.name}</span>
          {props.profile.id === props.channel.members[0].userId && (
            <span className="p-2 text-2xl w-fit text-yellow-300 rounded-full">
              <AiTwotoneStar />
            </span>
          )}
        </div>
        <Modal
          show={show}
          size="3xl"
          popup={true}
          id="UserInModal"
          onClose={() => setShow(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8">
              <div>
                <Avatar size="xl" img={props.profile.avatar} rounded={true} />
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <Label value="Name" />
                  <TextInput
                    id="name"
                    name="name"
                    defaultValue={props.profile.name}
                    readOnly={true}
                  />
                </div>
                <div>
                  <Label htmlFor="disabledInput1">Email</Label>
                  <TextInput
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={props.profile.email}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <Label value="Sex" />
                  <TextInput
                    id="sex"
                    name="sex"
                    required={true}
                    defaultValue={props.profile.sex}
                    readOnly={true}
                  ></TextInput>
                </div>
                <div>
                  <Label value="Country" />
                  <TextInput
                    id="country"
                    name="country"
                    defaultValue={props.profile.country}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <Label value="Date of Birth" />
                  <TextInput
                    id="dateOfBirth"
                    name="dateOfBirth"
                    defaultValue={dateOfBirth}
                    readOnly={true}
                  />
                </div>
                <div className="grid grid-cols-3 pt-6 gap-4"></div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </>
  );
}
