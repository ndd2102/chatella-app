import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  isLogin: boolean;
}

const initialState: AppState = {
  isLogin: false,
};

const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    initializeApp: () => initialState,
    loginSuccess: (state) => {
      state.isLogin = true;
    },
    loginError: (state) => {
      state.isLogin = false;
    },
  },
});

export const { initializeApp, loginSuccess, loginError } = slice.actions;

export default slice.reducer;
