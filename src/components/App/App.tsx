import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { useStoreWithInitializer } from "../../state/storeHooks";
import { store } from "../../state/store";
import { endLoad, loadProfile, logout } from "./App.slice";
import Home from "../../pages/Home/Home";
import { getProfile } from "../../services/api";
import { Spinner } from "flowbite-react";
import Workspace from "../../pages/Workspace/Workspace";
import { loginSuccess } from "../Modal/Login/Login.slice";

export default function App() {
  const { loading, profile } = useStoreWithInitializer(({ app }) => app, load);
  const accountIsLogged = !(Object.keys(profile).length === 0);
  console.log(accountIsLogged);

  return (
    <Router>
      {!loading ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/workspace/:id"
            element={accountIsLogged ? <Workspace /> : <Navigate to="/" />}
          />
          <Route
            path="/workspace"
            element={accountIsLogged ? <Workspace /> : <Navigate to="/" />}
          />
          {/* <Route path="/profiles/:id" element = {<Profile />}/> */}
        </Routes>
      ) : (
        <div className="mt-32	justify-center text-center my-auto">
          <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
      )}
    </Router>
  );

  async function load() {
    if (!accountIsLogged) {
      const token = localStorage.getItem("token");
      if (!store.getState().app.loading || !token) {
        store.dispatch(endLoad());
        return;
      }
      const user: any = await getProfile().catch(() => {
        console.log("Cannot get profile");
        store.dispatch(logout());
        store.dispatch(endLoad());
        return;
      });
      if (user !== undefined) {
        store.dispatch(loadProfile(user));
        store.dispatch(loginSuccess());
      }
    }
    store.dispatch(endLoad());
  }
}
