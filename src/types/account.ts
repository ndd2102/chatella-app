import axios from "axios";
import { Decoder, object, string } from "decoders";
import { loadUser } from "../components/App/App.slice";
import { store } from "../state/store";

export interface Account {
  email: string;
  token: string;
}

export const accountDecoder: Decoder<Account> = object({
  email: string,
  token: string,
});

// export interface UserSettings extends PublicUser {
//   email: string;
//   password: string | null;
// }

export interface AccountForRegistration {
  email: string;
  password: string;
  confirmPassword: string;
}

export function loadAccountIntoApp(account: Account) {
  localStorage.setItem("token", account.token);
  axios.defaults.headers.Authorization = `Token ${account.token}`;
  store.dispatch(loadUser(account));
}
