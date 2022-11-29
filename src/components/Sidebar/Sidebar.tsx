import { Avatar } from "flowbite-react";
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { GrGroup } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";

export const SidebarComponent = () => {
  return (
    <div className="fixed flex-col top-0 left-0 w-64 bg-white h-full border-r">
      <div className="items-center justify-center h-24 border-b">
        <div className="font-sacramento text-center pt-2 text-blue-800 whitespace-nowrap text-lg font-semibold dark:text-white">
          Chatella
        </div>
        <div className="p-2 flex justify-center gap-4">
          <Avatar rounded={true} size="md"></Avatar>
          <div className="align-center">
            <div className=" text-sm font-medium">Linh nè</div>
            <div className=" truncate text-sm">khanhlinh@gmail.com</div>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
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
          <li>
            <a
              href="/"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4 text-lg">
                <CgProfile></CgProfile>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Profile
              </span>
            </a>
          </li>
          <li>
            <a
              href="/"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4 text-lg">
                <HiOutlineLogout></HiOutlineLogout>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Log Out
              </span>
            </a>
          </li>
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">
                Channel
              </div>
            </div>
          </li>
          <li>
            <a
              href="/"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4 text-lg">
                <GrGroup></GrGroup>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Channel 1
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
