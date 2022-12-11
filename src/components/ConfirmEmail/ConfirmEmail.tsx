import { useEffect, useState } from "react";
import { confirmEmail } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Check } from "heroicons-react";

export default function ConfirmEmail() {
  const [uuid, setUuid] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    // get uuid by url
    const uuidGet = queryParams.get("uuid") || "";
    setUuid(uuidGet);
    // get token by url
    const tokenGet = queryParams.get("token") || "";
    setToken(tokenGet);
    //console.log(queryParams);

    //console.log(uuidGet);
    //console.log(tokenGet);
  }, []);
  async function confirmE() {
    await confirmEmail(uuid, token);
  }
  confirmE();
  return (
    <form className="space-y-6 bg-gray-50 px-6 pb-10 sm:pb-6 lg:px-8 xl:pb-8">
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full border p-8 m-auto rounded-md shadow-lg lg:max-w-xl bg-white">
          <div className="p-relative t-110 w-320px items-center display-block m-auto text-center">
            <div className="inline-flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500">
              <Check className="h-24 w-24" />
            </div>
            <h3 className="text-3xl mt-12 px-8 text-center font-medium text-gray-900 dark:text-white pb-5">
              Congratulations!
            </h3>
            <span>You have successfully registered an account!</span>
          </div>
          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleSubmit}
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    navigate("/");
  }
}
