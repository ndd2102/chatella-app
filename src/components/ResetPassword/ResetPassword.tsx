import { uuid } from "decoders";
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
        const queryParams = new URLSearchParams(window.location.search)
        // get uuid by url
        const uuidGet = queryParams.get('uuid')||'';
        setUuid(uuidGet);
        // get token by url
        const tokenGet = queryParams.get('token')||'';
        setToken(tokenGet);    
        //console.log(queryParams);

        //console.log(uuidGet);
        //console.log(tokenGet);
    }, []);
    return (
        <>
        <form className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                New Password
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your new password" />
                </div>
                <TextInput
                  id="email"
                  type="text"
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
              <div className="w-full">
                <Button className="w-full" onClick={handleSubmit}>
                  Enter your new password!
                </Button>
              </div>
            </form>
        </>
    )

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
        }
        else {
          await confirmForgotPassword(newPassword, uuid, token);
          //navigate("/");
        }
      }
}

export default ResetPassword;