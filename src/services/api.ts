import axios from "axios";
// import { guard, object } from "decoders";
import { useDispatch } from "react-redux";
import settings from "../config/settings";
import { loginErrors, startLoginIn } from "../pages/Login/Login.slice";
import {
  registerErrors,
  startSigningUp,
} from "../pages/Register/Register.slice";
import { store } from "../state/store";
import { Account, accountDecoder, loadAccountIntoApp } from "../types/account";

axios.defaults.baseURL = settings.baseApiUrl;

export async function login(email: string, password: string) {
  await axios
    .post("account/signin", {
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.data.status) {
        store.dispatch(startLoginIn());
        const account: Account = {
          email: email,
          token: response.data.data.token,
        };
        loadAccountIntoApp(account);
      }
    });
}

export async function register(email: string, password: string) {
  await axios
    .post("account/signup", {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response.data.message);
      store.dispatch(startSigningUp());
    });
}

// export async function getAccount(): Promise<Account> {
//   const { data } = await axios.get("account");
//   return guard(object({ account: accountDecoder }))(data).account;
// }
