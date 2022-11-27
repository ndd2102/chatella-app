import { Exclamation } from "heroicons-react";
import { Button, Label, Modal, TextInput, Toast } from "flowbite-react";
import React, { useState } from "react";
import { changePassword } from "../../../../services/api";

export default function ChangePassword({ email }: { email: string }) {
  const initialState = {
    email: email,
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const [changePasswordInput, setChangePasswordInput] = useState(initialState);

  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <div className="w-full">
      <React.Fragment>
        <Button className="w-full" color="gray" onClick={() => setShow(true)}>
          Change Password
        </Button>
        <Modal
          show={show}
          size="md"
          popup={true}
          id="signInModal"
          onClose={() => setShow(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <form className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Change your password
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                  type="email"
                  name="email"
                  defaultValue={email}
                  readOnly={true}
                  disabled={true}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required={true}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="New password" />
                </div>
                <TextInput
                  type="password"
                  name="newPassword"
                  placeholder="••••••••"
                  required={true}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Confirm your new password" />
                </div>
                <TextInput
                  name="confirmNewPassword"
                  type="password"
                  placeholder="••••••••"
                  required={true}
                  onChange={handleChange}
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
              <div className="w-full">
                <Button className="w-full" onClick={handleSubmit}>
                  Change Password
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </div>
  );

  function handleChange(event: { target: { name: any; value: any } }) {
    setError(false);
    setChangePasswordInput({
      ...changePasswordInput,
      [event.target.name]: event.target.value,
    });
  }

  function checkPassword(password: string) {
    const validPassword = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,14}$"
    );
    if (!validPassword.test(password)) {
      return false;
    } else return true;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(
      changePasswordInput.newPassword,
      changePasswordInput.confirmNewPassword
    );
    if (
      changePasswordInput.newPassword !== changePasswordInput.confirmNewPassword
    ) {
      setError(true);
      setErrorMessage("Password not match!");
    } else if (!checkPassword(changePasswordInput.newPassword)) {
      setError(true);
      setErrorMessage(
        "Password must be 6-14 characters long, contain at least 1 uppercase letter and at least 1 special character!"
      );
    } else {
      await changePassword(
        changePasswordInput.email,
        changePasswordInput.password,
        changePasswordInput.newPassword
      ).catch((err) => {
        setError(true);
        setErrorMessage(err.response.data.error);
      });
      if (error) {
        return;
      }
      window.location.reload();
    }
  }
}
