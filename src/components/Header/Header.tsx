import { Navbar } from "flowbite-react";
import { HashRouter, NavLink } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import { useStore } from "../../state/storeHooks";
import { Account } from "../../types/account";

export default function Header() {
  const { account } = useStore(({ app }) => app);

  return (
    <>
      <Navbar className="shadow-md" fluid={true} rounded={true}>
        <Navbar.Brand>
          <span className="font-sacramento text-blue-800 self-center whitespace-nowrap text-4xl	font-semibold dark:text-white">
            Chatella
          </span>
        </Navbar.Brand>
        <Navbar.Collapse>
          {account.match({
            none: () => <GuestLinks />,
            some: (account) => <UserLinks account={account} />,
          })}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

function GuestLinks() {
  return (
    <div className="flex ml-auto space-x-14 mx-4">
      <Login />
      <Register />
    </div>
  );
}

function UserLinks({ account: { email } }: { account: Account }) {
  return (
    <>
      <Navbar.Link href="/home" active={true}>
        Home
      </Navbar.Link>
      <Navbar.Link href="/chat">Chat</Navbar.Link>
    </>
  );
}
