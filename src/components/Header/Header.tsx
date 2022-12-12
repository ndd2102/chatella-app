import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { NavbarCollapse } from "flowbite-react/lib/esm/components/Navbar/NavbarCollapse";
import Login from "../Modal/Login/Login";
import { store } from "../../state/store";
import { useStore } from "../../state/storeHooks";
import { logout } from "../App/App.slice";
import Register from "../Modal/Register/Register";
import { UserInfo } from "../Modal/UserInfo/UserInfo";
import { Profile } from "../../types/profile";
import { useNavigate } from "react-router";
import { HiOutlineMenu } from "react-icons/hi";

export default function Header() {
  const { profile } = useStore(({ app }) => app);
  const accountIsLogged = profile.id === -1 ? false : true;

  return (
    <>
      <Navbar
        className="shadow-md content-center rounded-none"
        fluid={true}
        rounded={true}
      >
        <Navbar.Brand>
          <span className="font-sacramento pt-2 text-blue-800 self-center whitespace-nowrap text-4xl font-semibold dark:text-white pr-4">
            Chatella
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        {accountIsLogged ? <UserLinks profile={profile} /> : <GuestLinks />}
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

function UserLinks({
  profile: { email, name, dateOfBirth, country, avatar, sex, channelID },
}: {
  profile: Profile;
}) {
  const navigate = useNavigate();
  const logOutButton = () => {
    store.dispatch(logout());
    window.location.reload();
  };

  return (
    <div className="flex grow w-9/10 ml-24 mr-8 items-center">
      <NavbarCollapse className="mr-16">
        <Navbar.Link
          className="mr-8 hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          className="hover:cursor-pointer"
          onClick={() => navigate("/workspace")}
        >
          Workspace
        </Navbar.Link>
      </NavbarCollapse>
      <HiOutlineMenu className="md:hidden"></HiOutlineMenu>
      <div className="grow justify-items-end">
        <div className="float-right">
          <Dropdown
            label={<Avatar alt="User settings" img={avatar} rounded={true} />}
            arrowIcon={false}
            inline={true}
          >
            <Dropdown.Header>
              <span className="block text-sm">{name}</span>
              <span className="block truncate text-sm font-medium">
                {email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <UserInfo
                avatar={avatar}
                name={name}
                dateOfBirth={dateOfBirth}
                email={email}
                country={country}
                sex={sex}
              />
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logOutButton}>Log out</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
