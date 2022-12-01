import axios from "axios";
import settings from "../config/settings";
import { store } from "../state/store";
import { Channel } from "../types/channel";
import { Profile } from "../types/profile";

axios.defaults.baseURL = settings.baseApiUrl;

export async function login(email: string, password: string) {
  await axios
    .post("account/signin", {
      email: email,
      password: password,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
    });
}

export async function register(email: string, password: string) {
  await axios.post("account/signup", {
    email: email,
    password: password,
  });
}

export async function changePassword(
  email: string,
  password: string,
  newPassword: string
) {
  await axios
    .patch("account/change-password", {
      email: email,
      password: password,
      newPassword: newPassword,
    })
    .then((response) => {
      console.log(response);
    });
}

export async function getProfile(): Promise<Profile> {
  let profile: any;
  await axios.get("account/profile/current-profile").then((response) => {
    profile = {
      userId: response.data.data.id,
      email: response.data.data.email,
      name: response.data.data.name,
      avatar: response.data.data.avatar,
      sex: response.data.data.sex,
      dateOfBirth: response.data.data.dob,
      country: response.data.data.national,
      channelID: response.data.data.channels.map(
        (channel: { id: number }) => channel.id
      ),
    };
  });
  return profile;
}

export async function updateProfile(
  name: string,
  dob: string,
  sex: string,
  national: string,
  avatar: string
) {
  await axios.patch("account/profile/current-profile", {
    name: name,
    dob: dob,
    sex: sex,
    national: national,
    avatar: avatar,
  });
}

export async function resendEmail(email: string) {
  await axios.post("mail/validate-email", {
    email: email,
  });
}

export async function createChannel(channelName: string) {
  let id: number = await axios
    .post("channel/create-channel", {
      name: channelName,
    })
    .then((response) => {
      console.log(`Create channel ${channelName} successfully`);
      return response.data.data.id;
    });
  return id;
}

export async function getChannel(channelId: number): Promise<Channel> {
  let channel: any;
  await axios
    .get(`channel/channelId=${channelId}`)
    .then((response) => {
      channel = {
        id: response.data.data.number,
        members: response.data.data.members,
        avatar: response.data.data.avatar,
        name: response.data.data.name,
      };
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });
  return channel;
}
