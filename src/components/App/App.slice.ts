import { None, Option, Some } from "@hqoss/monads";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    loadUser: (state, { payload: account }: PayloadAction<Account>) => {
      state.account = Some(account);
      state.loading = false;
    },
    logout: (state) => {
      state.account = None;
    },
    endLoad: (state) => {
      state.loading = false;
    },
  },
});

export const { loadUser, logout, endLoad, initializeApp } = slice.actions;

export default slice.reducer;
