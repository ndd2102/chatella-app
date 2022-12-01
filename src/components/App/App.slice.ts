import { None, Option, Some } from "@sniptt/monads/build";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Profile } from "../../types/profile";

export interface AppState {
  profile: Option<Profile>;
  loading: boolean;
}

const initialState: AppState = {
  profile: None,
  loading: true,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    initializeApp: () => initialState,
    loadProfile: (state, { payload: profile }: PayloadAction<Profile>) => {
      console.log(profile);
      state.profile = Some(profile);
      state.loading = false;
    },
    logout: (state) => {
      state.profile = None;
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    },
    endLoad: (state) => {
      state.loading = false;
    },
  },
});

export const { loadProfile, logout, endLoad, initializeApp } = slice.actions;

export default slice.reducer;
