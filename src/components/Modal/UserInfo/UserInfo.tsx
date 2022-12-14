import React, { useState } from "react";
import {
  Avatar,
  Button,
  Label,
  Modal,
  Select,
  TextInput,
  Toast,
} from "flowbite-react";

import ChangePassword from "../Password/ChangePassword/ChangePassword";
import { getProfile, updateProfile } from "../../../services/api";
import { MdCameraAlt } from "react-icons/md";
import { UploadClient } from "@uploadcare/upload-client";
import { store } from "../../../state/store";
import { loadProfile } from "../../App/App.slice";
import { isAfter } from "date-fns";
import { Exclamation } from "heroicons-react";

export function UserInfo(props: {
  avatar: string;
  name: string;
  email: string;
  sex: string | undefined;
  country: string | undefined;
  dateOfBirth: string | undefined;
}) {
  const initialState = {
    name: props.name,
    sex: props.sex,
    dateOfBirth: props.dateOfBirth,
    country: props.country,
  };
  const [profileInput, setProfileInput] = useState(initialState);
  const [show, setShow] = useState(false);
  const [upDateAva, setUpDateAva] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [avatar, setAvatar] = useState<string>(props.avatar);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const today = new Date();

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
              <div>
                <div className="flex justify-center ml-28 -mb-5">
                  <MdCameraAlt />
                </div>
                <Avatar
                  onClick={() => setUpDateAva(true)}
                  size="xl"
                  img={avatar || props.avatar}
                  rounded={true}
                />
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
                    defaultValue={props.country}
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
                    <ChangePassword email={props.email} />
                  </div>
                  <Button onClick={onSubmit}>Confirm</Button>
                </div>
              </div>
              {error && (
                <Toast>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                    <Exclamation className="h-5 w-5" />
                  </div>
                  <div className="ml-3 text-sm font-normal">{errorMessage}</div>
                </Toast>
              )}
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={upDateAva}
          size="2xl"
          popup={true}
          id="UserInModal"
          onClose={() => setUpDateAva(false)}
        >
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Choose an image
              </h3>
              <TextInput type="file" accept="image/*" onChange={changeAvatar} />
              <div className="block ml-auto pb-6">
                <Button className="block float-right" onClick={upFile}>
                  Update
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </>
  );

  function changeAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files;
    if (!file) return;
    setSelectedImage(file[0]);
  }

  function upFile() {
    const client = new UploadClient({ publicKey: "9186d5e8d09fb1cd12e1" });
    if (selectedImage !== undefined && setAvatar !== undefined) {
      client.uploadFile(selectedImage).then((file) => {
        setAvatar("https://ucarecdn.com/" + file.uuid + "/");
      });
    }
    setUpDateAva(false);
  }

  function handleChange(event: { target: { name: any; value: any } }) {
    setError(false);
    setProfileInput({
      ...profileInput,
      [event.target.name]: event.target.value,
    });
  }

  async function onSubmit() {
    if (
      profileInput.dateOfBirth !== undefined &&
      profileInput.sex !== undefined &&
      profileInput.country !== undefined
    ) {
      const dateOfBirth = new Date(profileInput.dateOfBirth);
      if (isAfter(dateOfBirth, today)) {
        setError(true);
        setErrorMessage("invalid date of birth");
        setProfileInput({ ...profileInput, dateOfBirth: props.dateOfBirth });
      } else {
        await updateProfile(
          profileInput.name,
          profileInput.dateOfBirth,
          profileInput.sex,
          profileInput.country,
          avatar
        );
        const newProfile: any = await getProfile();
        store.dispatch(loadProfile(newProfile));
        window.location.reload();
      }
    }
  }
}
