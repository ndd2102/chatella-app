import { useEffect, useState } from "react";
import { confirmEmail } from "../../services/api";

export default function ConfirmEmail() {
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
    async function confirmE() {
        await confirmEmail(uuid, token);
    }
    confirmE();
    return (
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            New Password
        </h3>
    )
}

