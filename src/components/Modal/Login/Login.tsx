import React, { useState } from "react";
import { store } from "../../../state/store";
import { getProfile, login } from "../../../services/api";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  Spinner,
  TextInput,
  Toast,
} from "flowbite-react";
import { Exclamation } from "heroicons-react";
import { loadProfile } from "../../App/App.slice";
import ForgotPassword from "../Password/ForgotPassword/ForgotPassword";
import { loginError, loginSuccess } from "./Login.slice";
import { useNavigate } from "react-router";
import { resendEmail } from "../../../services/api"


export default function Login() {
  const initialState = {
    email: "",
    password: "",
  };
  const [accountSignIn, setAccountSignIn] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setLoad] = useState(false);

  return (
    <div>
      <React.Fragment>
        <button
          className="text-blue-800 bg-sky-50 border border-transparent hover:bg-blue-50 flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"
          onClick={() => setShow(true)}
        >
          <span className="flex items-center rounded-md text-sm px-4 py-2">
            Sign in
          </span>
        </button>
        <Modal
          show={show}
          size="md"
          popup={true}
          id="signInModal"
          onClose={() => setShow(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <form className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 font-lexend">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Sign in to our platform
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  required={true}
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <ForgotPassword />
              </div>
              {error && (
                <Toast>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                    <Exclamation className="h-5 w-5" />
                  </div>
                  <div className="ml-3 text-sm font-normal pr-1.5">
                    {errorMessage === "Account inactivated" ? (
                      <>
                        Your account is inactivated.{" "}
                        <span
                          onClick={resendMail}
                          className="text-blue-500 hover:cursor-pointer hover:text-blue-600"
                        >
                          Click this
                        </span>{" "}
                        and we will send you email verification!
                      </>
                    ) : (
                      <>{errorMessage}</>
                    )}
                  </div>
                </Toast>
              )}
              <div className="w-full">
                <Button
                  disabled={isLoading}
                  className="w-full"
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <div>
                      <Spinner /> Logging in...
                    </div>
                  ) : (
                    <>Log in to your account</>
                  )}
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
    setLoad(false);
    setAccountSignIn({
      ...accountSignIn,
      [event.target.name]: event.target.value,
    });
  }

  function resendMail() {
    resendEmail(accountSignIn.email);
    window.alert("Check your email!");
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    store.dispatch(loginSuccess());
    setLoad(true);

    await login(accountSignIn.email, accountSignIn.password).catch((error) => {
      setError(true);
      setErrorMessage(error.response.data.error);
      setLoad(false);
      store.dispatch(loginError());
      return;
    });

    if (!store.getState().login.isLogin) {
      return;
    }

    const user: any = await getProfile().catch((error) => {
      store.dispatch(loginError);
      setErrorMessage(error.response.data.message);
      setError(true);
      setLoad(false);
      store.dispatch(loginError());
      console.log("signin error");
      return;
    });

    if (store.getState().login.isLogin) {
      store.dispatch(loginSuccess());
      setLoad(false);
      setShow(false);
      store.dispatch(loadProfile(user));
      window.location.reload();
    }
  }
}
