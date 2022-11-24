import { None, Option, Some } from "@sniptt/monads/build";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Account } from "../../types/account";
import { Profile } from "../../types/profile";

export interface AppState {
  account: Option<Account>;
  profile: Option<Profile>;
  loading: boolean;
}

const initialState: AppState = {
  account: None,
  profile: None,
  loading: true,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    initializeApp: () => initialState,
    loadAccount: (state, { payload: account }: PayloadAction<Account>) => {
      state.account = Some(account);
      state.loading = false;
    },
    loadProfile: (state, { payload: profile }: PayloadAction<Profile>) => {
      state.profile = Some(profile);
    },
    logout: (state) => {
      state.account = None;
      state.profile = None;
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    },
    endLoad: (state) => {
      state.loading = false;
    },
  },
});

export const { loadAccount, loadProfile, logout, endLoad, initializeApp } =
  slice.actions;

export default slice.reducer;
