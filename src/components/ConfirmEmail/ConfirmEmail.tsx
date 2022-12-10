import { useEffect, useState } from "react";
import { confirmEmail } from "../../services/api";
import { GiConfirmed } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function ConfirmEmail() {
    const [uuid, setUuid] = useState("");
    const [token, setToken] = useState(""); 
    const navigate = useNavigate();
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
    async function confirmE() {
        await confirmEmail(uuid, token);
    }
    confirmE();
    return (
        <form className="space-y-6 px-6 pb-10 sm:pb-6 lg:px-8 xl:pb-8">
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
              <div className="w-full p-6 m-auto bg-lime-400 rounded-md shadow-xl lg:max-w-xl">
                <div className="p-relative t-110 w-320px display-block m-auto text - center">
                    <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white pb-5">
                        Congratulations, you have successfully registered an account!
                    </h3>
                </div>
                <GiConfirmed/>
                <div className="mt-6">
                      <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={handleSubmit}>
                          Back to login
                      </button>
                </div>
               </div>
            </div>
          </form>
        
    )
    function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        navigate("/");
    }
}

