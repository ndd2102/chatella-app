import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  account: {
    email: string;
    password: string;
  };
  error: string;
  loginIn: boolean;
}

const initialState: LoginState = {
  account: {
    email: "",
    password: "",
  },
  error: "",
  loginIn: false,
};

const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    initializeLogin: () => initialState,
    loginErrors: (
      state,
      { payload: { errorMessage } }: PayloadAction<{ errorMessage: string }>
    ) => {
      state.loginIn = false;
      state.error = errorMessage;
      console.log("loginError called");
      console.log("slice error " + errorMessage);
    },
    updateField: (
      state,
      {
        payload: { name, value },
      }: PayloadAction<{ name: keyof LoginState["account"]; value: string }>
    ) => {
      state.account[name] = value;
    },
    startLoginIn: (state) => {
      state.loginIn = true;
    },
  },
});

export const { initializeLogin, updateField, loginErrors, startLoginIn } =
  slice.actions;

export default slice.reducer;
