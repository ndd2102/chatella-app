import { None, Option, Some } from "@hqoss/monads";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Account } from "../../types/account";

export interface AppState {
  account: Option<Account>;
  loading: boolean;
}

const initialState: AppState = {
  account: None,
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
    logout: (state) => {
      state.account = None;
      delete axios.defaults.headers.Authorization;
      localStorage.removeItem("token");
    },
    endLoad: (state) => {
      state.loading = false;
    },
  },
});

export const { loadAccount, logout, endLoad, initializeApp } = slice.actions;

export default slice.reducer;
