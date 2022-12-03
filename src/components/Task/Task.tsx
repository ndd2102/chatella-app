import { Channel } from "../../types/channel";
import AddMember from "../Modal/Channel/AddMember/AddMember";
import Board from "./Board/Board";

function Task(props: { channel: Channel | undefined }) {
  const channel = props.channel;
  console.log(channel);
  return (
    <>
      {channel && (
        <div className="p-6 shadow-md h-screen">
          <div className="flex justify-between">
            <h1 className="text-blue-700 self-center whitespace-nowrap text-4xl font-semibold dark:text-white">
              {channel.name}
            </h1>
            <AddMember channelId={channel.id} />
          </div>
          <div className="grow">
            <Board />
          </div>
        </div>
      )}
    </>
  );
}

export default Task;
