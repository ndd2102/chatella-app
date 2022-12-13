import { axiosInstance } from "./../config/settings";
import { Channel } from "../types/channel";
import { Profile } from "../types/profile";
import { Board } from "../types/board";
import axios from "axios";

export async function login(email: string, password: string) {
  await axiosInstance
    .post("account/signin", {
      email: email,
      password: password,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.data.token);
    });
}

export async function register(email: string, password: string) {
  await axiosInstance.post("account/signup", {
    email: email,
    password: password,
  });
}

export async function forgotPassword(email: string) {
  await axiosInstance.post("/mail/forgot-password", {
    email: email,
  });
}

export async function confirmForgotPassword(
  newPassword: string,
  uuid: string,
  token: string
) {
  const axios1 = axios.create({
    baseURL: "http://w42g11.int3306.freeddns.org/",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });

  await axios1
    .patch(`account/forgot-password/uuid=${uuid}`, {
      newPassword: newPassword,
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function confirmEmail(uuid: string, token: string) {
  const axios2 = axios.create({
    baseURL: "http://w42g11.int3306.freeddns.org/",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });

  console.log(token);
  console.log(uuid);

  await axios2.get(`account/confirm-email/uuid=${uuid}`).catch((error) => {
    console.log(error);
  });
}

export async function resendEmail(email: string) {
  await axiosInstance.post("mail/validate-email", {
    email: email,
  });
}

export async function changePassword(
  email: string,
  password: string,
  newPassword: string
) {
  await axiosInstance
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
  await axiosInstance
    .get("account/profile/current-profile")
    .then((response) => {
      profile = {
        id: response.data.data.id,
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

export async function getUserProfile(userId: any): Promise<Profile> {
  let userProfile: any;
  await axiosInstance
    .get(`account/profile/userId=${userId}`)
    .then((response) => {
      userProfile = {
        id: response.data.data.id,
        avatar: response.data.data.avatar,
        name: response.data.data.name,
        email: response.data.data.email,
        sex: response.data.data.sex,
        dateOfBirth: response.data.data.dob,
        country: response.data.data.national,
      };
    });
  return userProfile;
}

export async function updateProfile(
  name: string,
  dob: string,
  sex: string,
  national: string,
  avatar: string
) {
  await axiosInstance.patch("account/profile/current-profile", {
    name: name,
    dob: dob,
    sex: sex,
    national: national,
    avatar: avatar,
  });
}

export async function createChannel(channelName: string) {
  let newChannel: Channel = await axiosInstance
    .post("channel/create-channel", {
      name: channelName,
    })
    .then((response) => {
      console.log(`Create channel ${channelName} successfully`);
      return response.data.data;
    })
    .catch((error) => {
      console.log(
        `Create channel ${channelName} failed. Error: ${error.response.data.error}`
      );
    });
  return newChannel;
}

export async function getChannel(channelId: number): Promise<Channel> {
  let channel: Channel = {
    id: -1,
    members: [],
    avatar: "",
    name: "",
    boards: [],
    createdDate: "",
  };
  await axiosInstance
    .get(`channel/channelId=${channelId}`)
    .then((response) => {
      channel = {
        id: response.data.data.id,
        members: response.data.data.members,
        avatar: response.data.data.avatar,
        name: response.data.data.name,
        boards: response.data.data.taskColumns,
        createdDate: response.data.data.createdDate,
      };
    })
    .catch((error) => {
      console.log(error);
    });
  return channel;
}

export async function updateChannel(channelId: number, name: string) {
  await axiosInstance.patch(`channel/channelId=${channelId}`, {
    name: name,
  })
}

export async function addMember(email: string, id: number) {
  await axiosInstance.patch(`channel/add/channelId=${id}?email=${email}`);
}

export async function deleteMember(userId: number, id: number) {
  await axiosInstance.delete(`channel/delete/channelId=${id}?userId=${userId}`);
}

export async function deleteChannel(id: number) {
  await axiosInstance.delete(`channel/channelId=${id}`);
}

export async function addTaskColumn(board: Board, channelId: number) {
  await axiosInstance
    .patch(`channel/addTaskColumn/channelId=${channelId}`, {
      title: board.title,
      taskColumnDetail: board.taskColumnDetail,
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function updateTaskColumn(board: Board, channelId: number) {
  await axiosInstance
    .post(`channel/updateTaskColumn/channelId=${channelId}`, {
      title: board.title,
      taskColumnDetail: board.taskColumnDetail,
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function deleteTaskColumn(board: Board, channelId: number) {
  await axiosInstance
    .delete(`channel/deleteTaskColumn/channelId=${channelId}`, {
      data: {
        title: board.title,
      },
    })
    .catch((error) => {
      console.log(error);
    });
}
