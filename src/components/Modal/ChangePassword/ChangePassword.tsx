import { Exclamation } from "heroicons-react";
import { Button, Label, Modal, TextInput, Toast } from "flowbite-react";
import React, { useState } from "react";
import { changePassword } from "../../../services/api";

export default function ChangePassword() {
  const account = {
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <div className="float-right">
      <React.Fragment>
        <Button color="gray" onClick={() => setShow(true)}>
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
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required={true}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required={true}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="New password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  name="newPassword"
                  placeholder="••••••••"
                  required={true}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Confirm your new password" />
                </div>
                <TextInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required={true}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
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

  function setEmail(value: string) {
    account.email = value;
  }
  function setPassword(value: string) {
    account.password = value;
  }
  function setNewPassword(value: string) {
    account.newPassword = value;
  }

  function setConfirmPassword(value: string) {
    setError(false);
    account.confirmNewPassword = value;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (account.newPassword !== account.confirmNewPassword) {
      setError(true);
      setErrorMessage("Password not match!");
    } else {
      await changePassword(
        account.email,
        account.password,
        account.newPassword
      ).catch((err) => {
        setError(true);
        setErrorMessage(err.response.data.error);
        //store.dispatch();
      });
    }
  }
}
