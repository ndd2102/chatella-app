import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/settings";
import { Profile } from "../../types/profile";

export interface AppState {
  profile: Profile;
  loading: boolean;
}

const initialState: AppState = {
  profile: {
    id: -1,
    email: "",
    name: "",
    avatar: "",
    sex: "",
    dateOfBirth: "",
    country: "",
    channelID: [],
  },
  loading: true,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    initializeApp: () => initialState,
    loadProfile: (state, { payload: profile }: PayloadAction<Profile>) => {
      state.profile = profile;
      state.loading = false;
    },
    logout: () => {
      delete axiosInstance.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    },
    endLoad: (state) => {
      state.loading = false;
    },
  },
});

export const { loadProfile, logout, endLoad, initializeApp } = slice.actions;

export default slice.reducer;
