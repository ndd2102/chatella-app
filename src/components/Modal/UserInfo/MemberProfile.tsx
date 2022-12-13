import React, { useState } from "react";
import { Avatar, Label, Modal, TextInput } from "flowbite-react";

import { Profile } from "../../../types/profile";

export function MemberProfile(props: { profile: Profile }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <React.Fragment>
        <div className="flex items-center" onClick={() => setShow(true)}>
          <span>
            <Avatar img={props.profile.avatar} className="pr-6" />
          </span>
          <span className="pl-2">{props.profile.name}</span>
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
                    disabled={true}
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
                  ></TextInput>
                </div>
                <div>
                  <Label value="Country" />
                  <TextInput
                    id="country"
                    name="country"
                    defaultValue={props.profile.country}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <Label value="Date of Birth" />
                  <TextInput
                    id="dateOfBirth"
                    name="dateOfBirth"
                    defaultValue={props.profile.dateOfBirth}
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
