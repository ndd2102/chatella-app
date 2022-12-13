//import { uuid } from "decoders";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import { Exclamation } from "heroicons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmForgotPassword, forgotPassword } from "../../services/api";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [uuid, setUuid] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    // get uuid by url
    const uuidGet = queryParams.get("uuid") || "";
    setUuid(uuidGet);
    // get token by url
    const tokenGet = queryParams.get("token") || "";
    setToken(tokenGet);
  }, []);
  return (
    <>
      <form className="space-y-6 px-6 pb-10 sm:pb-6 lg:px-8 xl:pb-8 bg-gray-50">
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8">
              Create your new password
            </h1>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your new password" />
            </div>
            <div>
              <TextInput
                id="email"
                type="password"
                name="email"
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
            <div className="mt-6">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:bg-purple-600"
                onClick={handleSubmit}
              >
                Create new password
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );

  function handleChange(event: { target: { name: any; value: any } }) {
    setError(false);
    setNewPassword(event.target.value);
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
    if (!checkPassword(newPassword)) {
      setError(true);
      setErrorMessage(
        "Password must be 6-14 characters long, contain at least 1 uppercase letter and at least 1 special character!"
      );
    } else {
      await confirmForgotPassword(newPassword, uuid, token);
      window.alert("SUCCESSFULL!");
      setTimeout(() => {
        console.log("Delayed for 2 second.");
      }, 2000);
      navigate("/");
    }
  }
}

export default ResetPassword;
