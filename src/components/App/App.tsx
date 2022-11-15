import {
  HashRouter,
  Navigate,
  Route,
  RouteProps,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import { useStoreWithInitializer } from "../../state/storeHooks";
import { store } from "../../state/store";
import { endLoad, loadUser } from "./App.slice";
import axios from "axios";
import Home from "../../pages/Home/Home";
// import { getAccount } from "../../services/api";

export default function App() {
  const { loading, account } = useStoreWithInitializer(({ app }) => app, load);
  const accountIsLogged = account.isSome();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/profiles/:id" element = {<Profile />}/> */}
      </Routes>
    </Router>
  );
}

async function load() {
  const token = localStorage.getItem("token");
  if (!store.getState().app.loading || !token) {
    store.dispatch(endLoad());
    return;
  }
  axios.defaults.headers.Authorization = `${token}`;

  // try {
  //   store.dispatch(loadUser(await getAccount()));
  // } catch {
  //   store.dispatch(endLoad());
  // }
}

function GuestOnlyRoute({
  children,
  userIsLogged,
  ...rest
}: {
  children: JSX.Element | JSX.Element[];
  userIsLogged: boolean;
} & RouteProps) {
  return (
    <Route {...rest}>
      {children}
      {userIsLogged && <Navigate to="/" />}
    </Route>
  );
}

/* istanbul ignore next */
function UserOnlyRoute({
  children,
  userIsLogged,
  ...rest
}: {
  children: JSX.Element | JSX.Element[];
  userIsLogged: boolean;
} & RouteProps) {
  return (
    <Route {...rest}>
      {children}
      {!userIsLogged && <Navigate to="/" />}
    </Route>
  );
}
