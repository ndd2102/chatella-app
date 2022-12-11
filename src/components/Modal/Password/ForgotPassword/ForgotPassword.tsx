import { Button, Label, Modal, TextInput, Toast } from "flowbite-react";
import React, { useState } from "react";
import { forgotPassword } from "../../../../services/api";
import { Exclamation } from "heroicons-react";

function ForgotPassword() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  return (
    <>
      <React.Fragment>
        <p
          className="text-sm font-medium text-blue-800 hover:underline underline-offset-1 hover:cursor-pointer"
          onClick={() => setShow(true)}
        >
          Lost password?
        </p>
        <Modal
          show={show}
          size="xl"
          popup={true}
          id="UserInModal"
          onClose={() => setShow(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Forgot Password
              </h3>

              <div className="w-full">
                <p>
                  Please enter your email and we will send you instructions on
                  how to reset your password!
                </p>
                <div className="mt-4">
                  <Label>Email</Label>
                  <TextInput
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
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
              {error && (
                <Toast>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                    <Exclamation className="h-5 w-5" />
                  </div>
                  <div className="ml-3 text-sm font-normal">{errorMessage}</div>
                  <Toast.Toggle />
                </Toast>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </>
  );

  function handleChange(event: { target: { value: any } }) {
    setError(false);
    setEmail(event.target.value);
  }

  async function onSubmit(event: React.FormEvent) {
    await forgotPassword(email).catch((error) => {
      setError(true);
      setErrorMessage(error.response.data.error);
      console.log(error);
    });
    localStorage.removeItem("token");
    //event.preventDefault();
    window.alert("Check your email!");
  }
}

export default ForgotPassword;
