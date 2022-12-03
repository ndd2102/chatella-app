import { Avatar } from "flowbite-react";
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { GrGroup } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { Profile } from "../../types/profile";
import { UserInfo } from "../Modal/UserInfo/UserInfo";
import { store } from "../../state/store";
import { logout } from "../App/App.slice";
import CreateChannel from "../Modal/Channel/CreateChannel/CreateChannel";
import { Channel } from "../../types/channel";

export const SidebarComponent = (props: {
  profile: Profile;
  channelInfo: Channel[];
  locationId: number;
}) => {
  const profile = props.profile;
  const channelList = props.channelInfo;
  const notFocus: string =
    "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6";
  const onFocus: string =
    "relative flex flex-row items-center h-11 focus:outline-none bg-gray-50 text-gray-800 border-l-4 border-transparent border-blue-600 pr-6";

  return (
    <div className="flex-col absolute w-64 bg-white h-screen border-r overflow-y-auto overflow-x-hidden">
      <div className="h-72 border-b text-gray-800">
        <h1 className="font-sacramento mt-6 my-auto text-center text-blue-700 whitespace-nowrap text-5xl font-semibold dark:text-white">
          Chatella
        </h1>
        <div className="p-2 justify-center">
          <Avatar rounded={true} img={profile.avatar} size="xl"></Avatar>
          <div className="text-center mt-4 text-md">
            <div className="font-medium">{profile.name}</div>
            <div className="truncate w-60">{profile.email}</div>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">
                Menu
              </div>
            </div>
          </li>
          <li>
            <a
              href="/"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4 text-lg">
                <HiOutlineHome></HiOutlineHome>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Home</span>
            </a>
          </li>
          <li className="hover:cursor-pointer">
            <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6">
              <span className="inline-flex justify-center items-center ml-4 text-lg">
                <CgProfile></CgProfile>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate w-full">
                <UserInfo
                  avatar={profile.avatar}
                  name={profile.name}
                  dateOfBirth={profile.dateOfBirth}
                  email={profile.email}
                  country={profile.country}
                  sex={profile.sex}
                />
              </span>
            </div>
          </li>
          <li
            className="hover:cursor-pointer border-b pb-4"
            onClick={() => {
              store.dispatch(logout());
              window.location.reload();
            }}
          >
            <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6">
              <span className="inline-flex justify-center items-center ml-4 text-lg">
                <HiOutlineLogout></HiOutlineLogout>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Log Out
              </span>
            </div>
          </li>
        </ul>

        <div className="flex flex-col grow">
          <div className="flex items-center justify-between text-sm font-light px-5 tracking-wide text-gray-500">
            Channel
            <div>
              <CreateChannel />
            </div>
          </div>
          <div className="pt-4">
            <ul>
              {channelList.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={`/channel/${channel.id}`}
                    className={
                      channel.id === props.locationId ? onFocus : notFocus
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4 text-lg">
                      <Avatar img={channel.avatar} />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      {channel.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
