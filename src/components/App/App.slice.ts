import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Profile } from "../../types/profile";

export interface AppState {
  profile: Profile;
  loading: boolean;
}

const initialState: AppState = {
  profile: JSON.parse(localStorage.getItem("user") || "{}"),
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
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    endLoad: (state) => {
      state.loading = false;
    },
  },
});

export const { loadProfile, logout, endLoad, initializeApp } = slice.actions;

export default slice.reducer;
