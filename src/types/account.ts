import axios from "axios";
import { Decoder, object, string } from "decoders";
import { loadAccount } from "../components/App/App.slice";
import { store } from "../state/store";

export interface Account {
  token: string;
}

export const accountDecoder: Decoder<Account> = object({
  token: string,
});

export interface AccountForRegistration {
  email: string;
  password: string;
  confirmPassword: string;
}

export function loadAccountIntoApp(account: Account) {
  localStorage.setItem("token", account.token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${account.token}`;
  store.dispatch(loadAccount(account));
}
