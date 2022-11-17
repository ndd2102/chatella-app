import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { useStoreWithInitializer } from "../../state/storeHooks";
import { store } from "../../state/store";
import { endLoad, loadAccount } from "./App.slice";
import Home from "../../pages/Home/Home";
import { Account } from "../../types/account";
import { getProfile } from "../../services/api";
import { Profile } from "../../types/profile";
import axios from "axios";
import { Spinner } from "flowbite-react";
// import { getAccount } from "../../services/api";

export default function App() {
  const { loading, account } = useStoreWithInitializer(({ app }) => app, load);
  const accountIsLogged = account.isSome();

  return (
    <Router>
      {!loading ? (
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/profiles/:id" element = {<Profile />}/> */}
        </Routes>
      ) : (
        <div className="mt-32	justify-center text-center my-auto">
          <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
      )}
    </Router>
  );
}

async function load() {
  const token = localStorage.getItem("token");
  if (!store.getState().app.loading || !token) {
    store.dispatch(endLoad());
    return;
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const user: any = await getProfile();
    if (user !== undefined) {
      const account: Account = {
        email: user.email,
        token: token,
      };
      store.dispatch(loadAccount(account));
    }
  }
  // store.dispatch(loadAccount(account))
  // try {
  //   store.dispatch(loadUser(await getAccount()));
  // } catch {
  //   store.dispatch(endLoad());
  // }
}
