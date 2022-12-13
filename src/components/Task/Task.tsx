import { Channel } from "../../types/channel";
import { DragDropContext } from "@hello-pangea/dnd";
import AddMember from "../Modal/Channel/AddMember/AddMember";
import DeleteMember from "../Modal/Channel/DeleteMember/DeleteMember";
import TaskBoard from "./Board/TaskBoard";
import { updateTaskColumn } from "../../services/api";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { AiOutlineClockCircle, AiOutlineMore } from "react-icons/ai";
import AddTaskBoard from "../Modal/Task/AddTaskBoard";
import { Board } from "../../types/board";
import { store } from "../../state/store";
import { Profile } from "../../types/profile";
import { updateBoards } from "../../pages/Workspace/Workspace.slice";
import DeleteChannel from "../Modal/Channel/DeleteChannel/DeleteChannel";
import { Dropdown } from "flowbite-react";
import EditTitleChannel from "../Modal/Channel/EditTitleChannel/EditTitleChannel";

function Task(props: {
  channel: Channel;
  memberList: Profile[];
  profile: Profile;
  isHost: boolean;
}) {
  const [channel, setChannel] = useState<Channel>(props.channel);
  const [memberList, setMemberList] = useState<Profile[]>(props.memberList);

  useEffect(() => {
    setChannel(props.channel);
    setMemberList(props.memberList);
  }, [props.channel, props.memberList]);

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    // Drop outside the boards
    if (!destination || !props.isHost) {
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

      await updateTaskColumn(newBoards[columnSourceIndex], channel.id);
      store.dispatch(
        updateBoards({ boards: newBoards, idChannel: channel.id })
      );
    } else {
      // Drop at another board
      const columnDestinationIndex =
        channel.boards.findIndex(
          (col) => col.title === destination.droppableId
        ) ?? 0;

      let newBoardDestinationColumn = Array.from(
        newBoards[columnDestinationIndex].taskColumnDetail
      );

      newBoardDestinationColumn.splice(destination.index, 0, cardSource);

      const newColumnSource: Board = {
        title: channel.boards[columnSourceIndex].title,
        taskColumnDetail: newBoardSourceColumn,
      };
      const newColumnDestination: Board = {
        title: channel.boards[columnDestinationIndex].title,
        taskColumnDetail: newBoardDestinationColumn,
      };
      newBoards[columnSourceIndex] = newColumnSource;
      newBoards[columnDestinationIndex] = newColumnDestination;

      setChannel({
        ...channel,
        boards: newBoards,
      });
      await updateTaskColumn(newBoards[columnSourceIndex], channel.id);
      await updateTaskColumn(newBoards[columnDestinationIndex], channel.id);
      store.dispatch(
        updateBoards({ boards: newBoards, idChannel: channel.id })
      );
    }
  };

  return (
    <>
      <div className="flex flex-col px-6 h-screen border-r" key={channel.id}>
        <div className="flex justify-between mb-8 mt-6">
          <h1 className="text-blue-700 self-center whitespace-nowrap text-4xl font-semibold dark:text-white">
            {channel.name}
          </h1>
          <div>
            <Dropdown
              label={
                <AiOutlineMore className="bg-blue-50 p-2 text-4xl text-blue-700 hover:bg-blue-100 hover:cursor-pointer rounded-full" />
              }
              arrowIcon={false}
              inline={true}
            >
              {props.isHost && (
                <>
                  <Dropdown.Item>
                    <AddMember
                      channelId={channel.id}
                      memberList={props.memberList}
                    />
                  </Dropdown.Item>
                  <Dropdown.Divider />

                  <Dropdown.Item>
                    <EditTitleChannel
                      channelId={channel.id}
                      isHost={props.isHost}
                    />
                  </Dropdown.Item>
                  <Dropdown.Divider />

                  <Dropdown.Item>
                    <DeleteMember
                      channelId={channel.id}
                      memberList={props.memberList}
                    />
                  </Dropdown.Item>
                  <Dropdown.Divider />
                </>
              )}
              <Dropdown.Item>
                <DeleteChannel
                  channelId={channel.id}
                  isHost={props.isHost}
                  profileId={props.profile.id}
                />
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
        <div className="flex text-gray-400 font-light items-center">
          <AiOutlineClockCircle />
          {format(
            Date.parse(channel.createdDate.substring(0, 10)),
            "MMM d, yyyy"
          )}
        </div>
        <div className="flex mt-4 gap-4 mb-2 items-center">
          <h1 className="text-lg">Tasks Management</h1>
          {props.isHost && <AddTaskBoard channel={channel} />}
        </div>
        <div className="-mx-6 pl-6 flex-1 h-full border-t overflow-y-auto overflow-x-auto bg-gray-50">
          {channel.boards !== undefined && channel.boards.length > 1 ? (
            <div className="flex flex-row flex-1 h-full py-4">
              <DragDropContext onDragEnd={onDragEnd}>
                {channel.boards.slice(1).map((board, index) => (
                  <div className="mr-4" key={index}>
                    <TaskBoard
                      board={board}
                      channel={channel}
                      memberList={memberList}
                      isHost={props.isHost}
                    />
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
