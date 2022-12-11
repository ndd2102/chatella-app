import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { Board } from "../../../types/board";
import { Channel } from "../../../types/channel";
import { Profile } from "../../../types/profile";
import AddTask from "../../Modal/Task/AddTask";
import TaskCard from "../Card/TaskCard";

function TaskBoard(props: {
  board: Board;
  channel: Channel;
  memberList: Profile[];
}) {
  const [board, setBoard] = useState<Board>(props.board);
  const [memberList, setMemberList] = useState<Profile[]>([]);

  useEffect(() => {
    setBoard(props.board);
    setMemberList(props.memberList);
  }, [props.board, props.memberList]);

  return (
    <div className="w-72 rounded-lg h-full" key={JSON.stringify(props.board)}>
      <div className="flex justify-between px-1.5">
        <h2 className="truncated text-xs uppercase font-medium tracking-widest">
          {board.title}
          <span className="text-gray-400 ml-2">
            {board.taskColumnDetail.length}
          </span>
        </h2>
        <AddTask channel={props.channel} board={board} members={memberList} />
      </div>
      <div className="mt-4">
        <Droppable droppableId={board.title}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {board.taskColumnDetail.length ? (
                board.taskColumnDetail.map((card, index) => {
                  return (
                    <div key={index}>
                      <Draggable
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
