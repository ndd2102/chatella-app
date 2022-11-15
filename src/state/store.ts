import { Action, configureStore } from "@reduxjs/toolkit";
import login from "../pages/Login/Login.slice";
import app from "../components/App/App.slice";
import register from "../pages/Register/Register.slice";

const middlewareConfiguration = { serializableCheck: false };

export const store = configureStore({
  reducer: { app, login, register },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(middlewareConfiguration),
});

export type State = ReturnType<typeof store.getState>;

export function dispatchOnCall(action: Action) {
  return () => store.dispatch(action);
}
