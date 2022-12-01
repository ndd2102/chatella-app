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
import axios from "axios";
import { Spinner } from "flowbite-react";
import Workspace from "../../pages/Workspace/Workspace";

export default function App() {
  const { loading, profile } = useStoreWithInitializer(({ app }) => app, load);
  const accountIsLogged = profile.isSome();

  return (
    <Router>
      {!loading ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/channel/:id"
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
    if (!store.getState().login.isLogin) {
      const token = localStorage.getItem("token");
      if (!store.getState().app.loading || !token) {
        store.dispatch(endLoad());
        return;
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const user: any = await getProfile().catch(() => {
        console.log("Cannot get profile");
        store.dispatch(logout());
        store.dispatch(endLoad());
        return;
      });

      if (user !== undefined) {
        store.dispatch(loadProfile(user));
      }
    }
    store.dispatch(endLoad());
  }
}
