import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { useStore, useStoreWithInitializer } from "../../state/storeHooks";
import { store } from "../../state/store";
import { endLoad, loadProfile, logout } from "./App.slice";
import Home from "../../pages/Home/Home";
import { getChannel, getProfile } from "../../services/api";
import { Spinner } from "flowbite-react";
import Workspace from "../../pages/Workspace/Workspace";
import { loginSuccess } from "../Modal/Login/Login.slice";
import { loadChannelList } from "../../pages/Workspace/Workspace.slice";
import ResetPassword from "../ResetPassword/ResetPassword";
import ConfirmEmail from "../ConfirmEmail/ConfirmEmail";

export default function App() {
  const { loading, profile } = useStoreWithInitializer(({ app }) => app, load);
  const { channelList } = useStore(({ workspace }) => workspace);
  const accountIsLogged = profile.id === -1 ? false : true;

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
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
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
    if (!accountIsLogged || channelList.length === 0) {
      const token = localStorage.getItem("token");
      if (!loading || !token) {
        store.dispatch(endLoad());
        return;
      }
      const user = await getProfile().catch(() => {
        console.log("Cannot get profile");
        store.dispatch(logout());
        store.dispatch(endLoad());
        return;
      });

      if (user !== undefined) {
        store.dispatch(loadProfile(user));
        store.dispatch(loginSuccess());
      } else {
        store.dispatch(endLoad());
        return;
      }
      const list = await Promise.all(
        user.channelID.slice(1).map(async (channelId) => {
          return await getChannel(channelId);
        })
      );
      store.dispatch(loadChannelList(list));
    }
    store.dispatch(endLoad());
  }
}
