import { createSlice } from "@reduxjs/toolkit";

export interface RegisterState {
  isRegistered: boolean;
}

const initialState: RegisterState = {
  isRegistered: false,
};

const slice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerSuccess: (state) => {
      state.isRegistered = true;
    },
    registerError: (state) => {
      state.isRegistered = false;
    },
  },
});

export const { registerSuccess, registerError } = slice.actions;

export default slice.reducer;
