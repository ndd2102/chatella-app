import React, { useState} from "react";
import {
  Avatar,
  Button,
  Label,
  Modal,
  Select,
  TextInput,
} from "flowbite-react";

import ChangePassword from "../ChangePassword/ChangePassword";
import { updateProfile } from "../../../services/api";



export function UserInfo(props: {
  avatar: string;
  name: string;
  email: string;
  sex : string | undefined
  country: string | undefined;
  dateOfBirth: string | undefined;
}) {
  // const { profile } = useStore(({ app }) => app);
  const initialState = {
    name : props.name,
    sex : props.sex,
    dateOfBirth : props.dateOfBirth,
    country : props.country
  }
  const [profileInput, setProfileInput] = useState(initialState);
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
                    defaultValue={props.sex || "Male"}
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
                    defaultValue={props.country || "Việt Nam"}
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
                    defaultValue={props.dateOfBirth}
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
    setProfileInput({...profileInput, [event.target.name]:event.target.value})
  }

  async function onSubmit() {
    if(profileInput.name !== "" && profileInput.dateOfBirth !== undefined && profileInput.sex !== undefined && profileInput.country !== undefined) {
    await updateProfile(profileInput.name, profileInput.dateOfBirth, profileInput.sex, profileInput.country)
    window.location.reload()
    }
  }
}
