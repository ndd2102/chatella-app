import { Avatar } from "flowbite-react";
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { Profile } from "../../types/profile";
import { UserInfo } from "../Modal/UserInfo/UserInfo";
import { store } from "../../state/store";
import { logout } from "../App/App.slice";
import CreateChannel from "../Modal/Channel/CreateChannel/CreateChannel";
import { Channel } from "../../types/channel";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export const SidebarComponent = (props: {
  profile: Profile;
  channelInfo: Channel[];
  locationId: number;
}) => {
  const profile = props.profile;
  const [channelList, setChannelList] = useState<Channel[]>(props.channelInfo);
  const navigate = useNavigate();
  const notFocus: string =
    "relative flex flex-row items-center h-11 hover:bg-sky-50 hover:text-blue-800 rounded-xl text-gray-700 hover:cursor-pointer";
  const onFocus: string =
    "relative flex flex-row items-center h-11 bg-sky-50 text-blue-800 rounded-xl hover:cursor-pointer";

  useEffect(() => {
    setChannelList(props.channelInfo);
  }, [props.channelInfo]);

  return (
    <div className="flex-row absolute w-72 px-4 bg-white h-screen border-r overflow-y-auto overflow-x-hidden">
      <div className="h-72">
        <h1 className="font-sacramento mt-6 my-auto text-center text-blue-700 whitespace-nowrap text-5xl font-semibold dark:text-white">
          Chatella
        </h1>
        <div className="p-2 justify-center">
          <Avatar rounded={true} img={profile.avatar} size="xl"></Avatar>
          <div className="text-center mt-4 text-md">
            <div className="font-medium text-lg">{profile.name}</div>
            <div className="truncate w-60 font-light text-gray-500">
              {profile.email}
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden font-medium">
        <ul className="flex flex-row items-center justify-between px-16 mb-4">
          <li onClick={() => navigate("/")}>
            <span className="flex bg-blue-50 p-2 text-lg w-fit text-blue-700 hover:bg-blue-100 hover:cursor-pointer rounded-full">
              <HiOutlineHome></HiOutlineHome>
            </span>
          </li>
          <li className="hover:cursor-pointer">
            <div className="flex items-center px-4">
              <span className="bg-blue-50 p-2 text-lg w-fit text-blue-700 hover:bg-blue-100 hover:cursor-pointer rounded-full">
                <CgProfile></CgProfile>
              </span>
              <span className="-ml-12 z-10 transient truncate w-full text-transparent">
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
            className="hover:cursor-pointer "
            onClick={() => {
              store.dispatch(logout());
              window.location.reload();
            }}
          >
            <div className="flex items-center">
              <span className="bg-blue-50 p-2 text-lg w-fit text-blue-700 hover:bg-blue-100 hover:cursor-pointer rounded-full">
                <HiOutlineLogout></HiOutlineLogout>
              </span>
            </div>
          </li>
        </ul>

        <div className="flex flex-col grow">
          <div className="flex items-center justify-between text-xs uppercase pl-5 tracking-widest text-gray-500">
            Channel
            <div>
              <CreateChannel />
            </div>
          </div>
          <div className="py-4">
            <ul className="space-y-1.5">
              {channelList.map((channel, id) => (
                <li key={id}>
                  <div
                    key={id}
                    onClick={() => navigate(`/workspace/${channel.id}`)}
                    className={
                      channel.id === props.locationId ? onFocus : notFocus
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-4 text-lg">
                      <Avatar img={channel.avatar} />
                    </span>
                    <span className="ml-2 text-sm font-normal tracking-wide truncate">
                      {channel.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
