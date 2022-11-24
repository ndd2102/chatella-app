import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Label,
  Modal,
  Select,
  TextInput,
} from "flowbite-react";
import { Profile } from "../../../types/profile";
import ChangePassword from "../ChangePassword/ChangePassword";

export function UserInfo(props: {
  avatar: string;
  name: string;
  email: string;
  country: string | undefined;
  dateOfBirth: string | undefined;
}) {
  // const { profile } = useStore(({ app }) => app);

  const [profileInput] = useState<Profile>();
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   async function loadUser() {
  //     setProfileInput(await getProfile());
  //   }
  //   loadUser();
  // }, []);

  return (
    <>
      <React.Fragment>
        <div className="w-full" onClick={() => setShow(true)}>
          Profile
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
              <div className="">
                <Avatar size="xl" img={props.avatar} rounded={true} />
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <Label value="Name" />
                  <TextInput
                    id="name"
                    name="name"
                    defaultValue={props.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="disabledInput1">Email</Label>
                  <TextInput
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    defaultValue={props.email}
                    readOnly={true}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <Label value="Sex" />
                  <Select
                    onChange={handleChange}
                    id="sex"
                    name="sex"
                    required={true}
                    defaultValue="Male"
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </Select>
                </div>
                <div>
                  <Label value="Country" />
                  <TextInput
                    id="country"
                    name="country"
                    defaultValue={props.country ? props.country : "Việt Nam"}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div>
                  <Label value="Date of Birth" />
                  <TextInput
                    id="dateOfBirth"
                    name="dateOfBirth"
                    defaultValue={
                      props.dateOfBirth ? props.dateOfBirth : "1/1/2002"
                    }
                    type="date"
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-3 pt-6 gap-4">
                  <div className="col-span-2 justify-center">
                    <ChangePassword />
                  </div>
                  <Button onClick={onSubmit}>Confirm</Button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </>
  );

  function handleChange(event: { target: { name: any; value: any } }) {
    if (profileInput !== undefined) {
      // profileInput[event.target.name as keyof Profile] = event.target.value;
    }
    console.log(profileInput);
  }

  function onSubmit() {}
}
