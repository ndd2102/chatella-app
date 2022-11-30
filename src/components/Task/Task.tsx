import { AiOutlineUserAdd } from "react-icons/ai";
import Board from "./Board/Board";

function Task() {
  return (
    <div className="p-6 shadow-md h-screen">
      <div className="flex justify-between">
        <h1 className="text-blue-700 self-center whitespace-nowrap text-4xl font-semibold dark:text-white">
          Channel Name
        </h1>
        <span className="bg-blue-50 p-2 text-3xl w-fit text-blue-700 hover:bg-blue-100 hover:cursor-pointer rounded-full">
          <AiOutlineUserAdd></AiOutlineUserAdd>
        </span>
      </div>
      <div className="">
        <Board />
      </div>
    </div>
  );
}

export default Task;
