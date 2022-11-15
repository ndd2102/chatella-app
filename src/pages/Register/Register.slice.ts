import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountForRegistration } from "../../types/account";

export interface RegisterState {
  account: AccountForRegistration;
  signingUp: boolean;
}

const initialState: RegisterState = {
  account: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  signingUp: false,
};

const slice = createSlice({
  name: "register",
  initialState,
  reducers: {
    initializeRegister: () => initialState,
    updateField: (
      state,
      {
        payload: { name, value },
      }: PayloadAction<{ name: keyof RegisterState["account"]; value: string }>
    ) => {
      state.account[name] = value;
    },
    registerErrors: (state) => {
      state.signingUp = false;
    },
    startSigningUp: (state) => {
      state.signingUp = true;
    },
  },
});

export const {
  initializeRegister,
  updateField,
  startSigningUp,
  registerErrors,
} = slice.actions;

export default slice.reducer;
