import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { NavbarCollapse } from "flowbite-react/lib/esm/components/Navbar/NavbarCollapse";
import { HashRouter, NavLink } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import { useStore } from "../../state/storeHooks";
import { Account } from "../../types/account";
import { UserInfo } from "../../pages/UserInfo/UserInfo";

export default function Header() {
  const { account } = useStore(({ app }) => app);

  return (
    <>
      <Navbar className="shadow-md content-center" fluid={true} rounded={true}>
        <Navbar.Brand>
          <span className="font-sacramento pt-2 text-blue-800 self-center whitespace-nowrap text-4xl	font-semibold dark:text-white">
            Chatella
          </span>
        </Navbar.Brand>
        {account.match({
          none: () => <GuestLinks />,
          some: (account) => <UserLinks account={account} />,
        })}
      </Navbar>
    </>
  );
}

function GuestLinks() {
  return (
    <NavbarCollapse>
      <div className="flex ml-auto space-x-14 mx-4">
        <Login />
        <Register />
      </div>
    </NavbarCollapse>
  );
}

function UserLinks({ account: { email } }: { account: Account }) {
  return (
    <div className="flex mr-auto space-x-8 mx-4 items-center">
      <NavbarCollapse>
        <Navbar.Link href="/home" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/chat">Chat</Navbar.Link>
      </NavbarCollapse>
      <Dropdown
        label={
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded={true}
          />
        }
        arrowIcon={false}
        inline={true}
      >
        <Dropdown.Header>
          <span className="block text-sm">Bonnie Green</span>
          <span className="block truncate text-sm font-medium">{email}</span>
        </Dropdown.Header>
        <Dropdown.Item><UserInfo/></Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Log out</Dropdown.Item>
      </Dropdown>
    </div>
  );
}
