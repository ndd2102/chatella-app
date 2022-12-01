import { Action, configureStore } from "@reduxjs/toolkit";
import app from "../components/App/App.slice";
import login from "../components/Modal/Login/Login.slice";

const middlewareConfiguration = { serializableCheck: false };

export const store = configureStore({
  reducer: { app, login },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(middlewareConfiguration),
});

export type State = ReturnType<typeof store.getState>;

export function dispatchOnCall(action: Action) {
  return () => store.dispatch(action);
}
