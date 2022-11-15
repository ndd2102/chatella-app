import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store, dispatchOnCall } from "../../state/store";
import { useStoreWithInitializer } from "../../state/storeHooks";
import { initializeLogin, loginErrors, LoginState } from "./Login.slice";
import { login } from "../../services/api";
import { updateField } from "./Login.slice";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Toast,
} from "flowbite-react";
import { Exclamation } from "heroicons-react";

export default function Login() {
  const { account } = useStoreWithInitializer(
    ({ login }) => login,
    dispatchOnCall(initializeLogin())
  );
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <div>
      <React.Fragment>
        <Button
          className="bg-slate-50 text-blue-600 hover:bg-slate-100"
          onClick={() => setShow(true)}
        >
          Sign in
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
                <a
                  href="/modal"
                  className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                >
                  Lost Password?
                </a>
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
                  Log in to your account
                </Button>
              </div>
              <div className="text-center text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <a
                  href="/modal"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Create account
                </a>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </div>
  );

  function handleChange(event: { target: { name: any; value: any } }) {
    setError(false);
    store.dispatch(
      updateField({
        name: event.target.name as keyof LoginState["account"],
        value: event.target.value,
      })
    );
  }

  async function handleSubmit(ev: React.FormEvent) {
    console.log(account.email, account.password);
    ev.preventDefault();
    login(account.email, account.password).catch((error) => {
      setError(true);
      store.dispatch(loginErrors);
      setErrorMessage(error.response.data.error);
      return;
    });
    if (store.getState().login.loginIn) {
      setShow(false);
      navigate("/");
    }
  }
}
