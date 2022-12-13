import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { Board } from "../../../types/board";
import { Channel } from "../../../types/channel";
import { Profile } from "../../../types/profile";
import AddTask from "../../Modal/Task/AddTask";
import EditTaskBoard from "../../Modal/Task/EditTaskBoard";
import TaskCard from "../Card/TaskCard";

function TaskBoard(props: {
  board: Board;
  channel: Channel;
  memberList: Profile[];
  isHost: boolean;
}) {
  const [board, setBoard] = useState<Board>(props.board);
  const [memberList, setMemberList] = useState<Profile[]>([]);

  useEffect(() => {
    setBoard(props.board);
    setMemberList(props.memberList);
  }, [props.board, props.memberList]);

  return (
    <div className="w-80" key={JSON.stringify(props.board)}>
      <div className="flex h-fit mt-2 justify-between px-1.5 mb-4">
        <div className="flex w-56 text-xs uppercase font-medium tracking-widest">
          <div className="truncate">{board.title}</div>
          <div className="text-gray-400 ml-2">
            {board.taskColumnDetail.length}
          </div>
        </div>
        {props.isHost && (
          <span className="flex gap-1.5">
            <EditTaskBoard board={board} channel={props.channel} />
            <AddTask
              channel={props.channel}
              board={board}
              members={memberList}
            />
          </span>
        )}
      </div>
      <div className="rounded-lg w-80 h-full border-dashed border-2 border-gray-300 p-4 hover:border-gray-600">
        <Droppable droppableId={board.title}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {board.taskColumnDetail.length ? (
                board.taskColumnDetail.map((card, index) => {
                  return (
                    <div key={index}>
                      <Draggable
                        isDragDisabled={!props.isHost}
                        index={index}
                        key={JSON.stringify(card)}
                        draggableId={card.title}
                      >
                        {(provided) => {
                          return (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <TaskCard
                                members={memberList}
                                card={card}
                                channel={props.channel}
                                board={board}
                                isHost={props.isHost}
                              />{" "}
                            </div>
                          );
                        }}
                      </Draggable>{" "}
                    </div>
                  );
                })
              ) : (
                <div className="h-36"></div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}

export default TaskBoard;
