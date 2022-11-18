import axios from "axios";
import { endLoad } from "../components/App/App.slice";
import settings from "../config/settings";
import { startLoginIn } from "../pages/Login/Login.slice";
import { startSigningUp } from "../pages/Register/Register.slice";
import { store } from "../state/store";
import { Account, loadAccountIntoApp } from "../types/account";
import { Profile } from "../types/profile";

axios.defaults.baseURL = settings.baseApiUrl;

export async function login(email: string, password: string) {
  await axios
    .post("account/signin", {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response);
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
    .then(() => {
      store.dispatch(startSigningUp());
    });
}
export async function changePassword(email: string, password: string, newPassword: string) {
  await axios
    .patch("account/change-password", {
      email: email,
      password: password,
      newPassword: newPassword,
    })
    .then((response) => {
      /*if (response.data.status) {
        store.dispatch(startLoginIn());
        const account: Account = {
          email: email,
          token: response.data.data.token,
        };
        loadAccountIntoApp(account);
      }*/
      console.log(response);
    });
}

export async function getProfile(): Promise<Profile> {
  let profile: any;
  await axios
    .get("account/profile/current-profile")
    .then((response) => {
      profile = {
        userId: response.data.data.id,
        email: response.data.data.email,
        name: response.data.data.name,
        avatar: response.data.data.avatar,
        sex: response.data.data.sex,
        dateOfBirth: response.data.data.dob,
        phoneNumber: response.data.data.phone,
        country: response.data.data.national,
        createdDate: response.data.data.createdDate,
      };
    })
    .catch(() => {
      store.dispatch(endLoad);
    });
  return profile;
}
// export async function getAccount(): Promise<Account> {
//   const { data } = await axios.get("account");
//   return guard(object({ account: accountDecoder }))(data).account;
// }
