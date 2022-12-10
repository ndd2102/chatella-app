import { Channel } from "../../types/channel";
import { DragDropContext } from "@hello-pangea/dnd";
import AddMember from "../Modal/Channel/AddMember/AddMember";
import DeleteMember from "../Modal/Channel/DeleteMember/DeleteMember";
import TaskBoard from "./Board/TaskBoard";
import { getUserProfile, updateTaskColumn } from "../../services/api";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { AiOutlineClockCircle } from "react-icons/ai";
import AddTaskBoard from "../Modal/Task/AddTaskBoard";
import { Board } from "../../types/board";
import { store } from "../../state/store";
import { Profile } from "../../types/profile";
import { updateBoards } from "../../pages/Workspace/Workspace.slice";

function Task(props: { channel: Channel }) {
  const [channel, setChannel] = useState<Channel>(props.channel);
  const [isLoading, setLoad] = useState(true);
  const [memberList, setMemberList] = useState<Profile[]>();
  useEffect(() => {
    setChannel(props.channel);
  }, [props.channel]);

  useEffect(() => {
    if (!isLoading || channel === undefined) return;
    const fetchUserList = async () => {
      const list = await Promise.all(
        channel.members.map(async (value) => {
          return await getUserProfile(value.userId);
        })
      );
      setMemberList(list);
      setLoad(false);
    };
    fetchUserList();
  }, [channel, isLoading]);

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    // Drop outside the boards
    if (!destination) {
      return;
    }

    // Drop in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const columnSourceIndex =
      channel.boards.findIndex((col) => col.title === source.droppableId) ?? 0;

    const cardSource =
      channel.boards[columnSourceIndex].taskColumnDetail.find(
        (card) => card.title === draggableId
      ) ?? channel.boards[columnSourceIndex].taskColumnDetail[0];

    let newBoards = Array.from(channel.boards);
    let newBoardSourceColumn = Array.from(
      newBoards[columnSourceIndex].taskColumnDetail
    );
    newBoardSourceColumn.splice(source.index, 1);

    // Drop in the same board
    if (destination.droppableId === source.droppableId) {
      newBoardSourceColumn.splice(destination.index, 0, cardSource);

      const newColumn: Board = {
        title: channel.boards[columnSourceIndex].title,
        taskColumnDetail: newBoardSourceColumn,
      };

      newBoards[columnSourceIndex] = newColumn;
      setChannel({
        ...channel,
        boards: newBoards,
      });
      console.log(channel.boards);
      await updateTaskColumn(newBoards[columnSourceIndex], channel.id);
      // store.dispatch(
      //   updateBoards({ boards: newBoards, idChannel: channel.id })
      // );
    } else {
      // Drop at another board
      const boardDestinationIndex =
        channel.boards.findIndex(
          (col) => col.title === destination.droppableId
        ) ?? 0;
      console.log(boardDestinationIndex);
      // let newBoardDestinationColumn = Array.from(
      //   newBoards[boardDestinationIndex].taskColumnDetail
      // );

      // newBoardDestinationColumn.splice(destination.index, 0, cardSource);

      // const newColumnSource: Board = {
      //   title: channel.boards[columnSourceIndex].title,
      //   taskColumnDetail: newBoardSourceColumn,
      // };
      // const newColumnDestination: Board = {
      //   title: channel.boards[boardDestinationIndex].title,
      //   taskColumnDetail: newBoardDestinationColumn,
      // };
      // newBoards[columnSourceIndex] = newColumnSource;
      // newBoards[boardDestinationIndex] = newColumnDestination;
      // console.log(newColumnSource, newColumnDestination);
      // setChannel({
      //   ...channel,
      //   boards: newBoards,
      // });
      // await updateTaskColumn(newBoards[boardSourceIndex], channel.id);
      // await updateTaskColumn(newBoards[boardDestinationIndex], channel.id);
    }
  };

  return (
    <>
      <div className="flex flex-col px-6 h-screen border-r" key={channel.id}>
        <div className="flex justify-between mb-8 mt-6">
          <h1 className="text-blue-700 self-center whitespace-nowrap text-4xl font-semibold dark:text-white">
            {channel.name}
          </h1>
          <AddMember channelId={channel.id} memberList={memberList} />
          <DeleteMember channelInfo={channel} />
        </div>
        <div className="flex text-gray-400 font-light items-center">
          <AiOutlineClockCircle />
          <p>
            {" "}
            {format(
              Date.parse(channel.createdDate.substring(0, 10)),
              "MMM d, yyyy"
            )}
          </p>
        </div>
        <div className="flex mt-4 gap-4 mb-2 items-center">
          <h1 className="text-lg">Tasks Management</h1>
          <AddTaskBoard channel={channel} />
        </div>
        <div className="-mx-6 px-6 flex-1 h-full border-t bg-gray-50">
          {channel.boards.length > 1 ? (
            <div className="flex flex-row flex-1 h-full gap-4 py-8 overflow-x-auto">
              <DragDropContext onDragEnd={onDragEnd}>
                {channel.boards.slice(1).map((board, index) => (
                  <div key={index}>
                    <TaskBoard board={board} channel={channel} />
                  </div>
                ))}
              </DragDropContext>
            </div>
          ) : (
            <div className="flex flex-row flex-1 mt-4">
              <p className="mb-8 font-light italic text-gray-600">
                Seems like you have not created any boards yet. Click the{" "}
                <span className="underline decoration-blue-400 decoration-2">
                  "Add a board"
                </span>{" "}
                below to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Task;
