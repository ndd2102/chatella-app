import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  Label,
  Modal,
  Textarea,
  TextInput,
} from "flowbite-react";
import AvatarGroupCounter from "flowbite-react/lib/esm/components/Avatar/AvatarGroupCounter";
import { Exclamation } from "heroicons-react";
import { useEffect, useState } from "react";
import { updateBoards } from "../../../pages/Workspace/Workspace.slice";
import { updateTaskColumn } from "../../../services/api";
import { store } from "../../../state/store";
import { Board } from "../../../types/board";
import { Card } from "../../../types/card";
import { Channel } from "../../../types/channel";
import { Profile } from "../../../types/profile";
import { formatDistance } from "date-fns";

function TaskCard(props: {
  card: Card;
  board: Board;
  channel: Channel;
  members: Profile[];
  isHost: boolean;
}) {
  const [card, setCard] = useState<Card>(props.card);
  const initialState: Card = {
    title: props.card.title,
    description: props.card.description,
    dueDate: props.card.dueDate,
    priority: props.card.priority,
    assignedTo: props.card.assignedTo,
  };
  const [showEditTask, setShowEditTask] = useState(false);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [cardInfo, setCardInfo] = useState<Card>(initialState);
  const [isLoading, setLoad] = useState(false);
  let remainingDays = card.dueDate
    ? formatDistance(new Date(), Date.parse(card.dueDate))
    : "";

  useEffect(() => {
    setCard(props.card);
  }, [props.card]);

  const styleHigh = `rounded-lg p-2 font-base text-xs text-red-500 bg-red-200`;
  const styleMedium =
    "rounded-lg p-2 font-base text-xs text-orange-500 bg-orange-200";
  const styleLow =
    "rounded-lg p-2 font-base text-xs text-green-400 bg-green-200";

  return (
    <>
      <div
        onClick={() => setShowEditTask(true)}
        className="p-4 rounded-lg bg-white my-2 h-36 drop-shadow hover:bg-neutral-50 hover:cursor-pointer"
      >
        <h3 className="font-base text-lg">{card.title}</h3>
        <p className="mt-1.5 h-12 text-base truncate text-gray-400 font-light">
          {card.description}
        </p>
        <div className="flex gap-4">
          {card.priority && (
            <div
              className={
                card.priority === "Low"
                  ? styleLow
                  : card.priority === "Medium"
                  ? styleMedium
                  : styleHigh
              }
            >
              {card.priority}
            </div>
          )}
          {remainingDays !== "" && (
            <span className="rounded-lg p-2 font-base text-xs text-white bg-slate-300">
              {remainingDays}
            </span>
          )}
        </div>
      </div>
      <Modal
        show={showEditTask}
        size="3xl"
        popup={true}
        onClose={() => setShowEditTask(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {props.isHost ? "Edit task" : "Task info"}
            </h3>
            <div className="block md:gap-6 space-y-4">
              <div>
                <Label value="Task Name" />
                <TextInput
                  required={true}
                  disabled={!props.isHost}
                  id="title"
                  name="title"
                  defaultValue={cardInfo.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Task Description" />
                <Textarea
                  className="font-normal text-sm"
                  disabled={!props.isHost}
                  id="description"
                  name="description"
                  defaultValue={cardInfo.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <Label value="Due date" />
                <TextInput
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  disabled={!props.isHost}
                  defaultValue={cardInfo.dueDate}
                  onChange={handleChange}
                />
              </div>

              {props.isHost && (
                <div className="col-span-1">
                  <Label className="w-full" value="Priority" />
                  <Button.Group className="w-full" outline={false}>
                    <Button
                      color="gray"
                      autoFocus={card.priority === "Low" ? true : false}
                      disabled={!props.isHost}
                      onClick={() =>
                        setCardInfo({ ...cardInfo, priority: "Low" })
                      }
                    >
                      Low
                    </Button>
                    <Button
                      color="warning"
                      autoFocus={card.priority === "Medium" ? true : false}
                      disabled={!props.isHost}
                      onClick={() =>
                        setCardInfo({ ...cardInfo, priority: "Medium" })
                      }
                    >
                      Medium
                    </Button>
                    <Button
                      color="failure"
                      autoFocus={card.priority === "High" ? true : false}
                      disabled={!props.isHost}
                      onClick={() =>
                        setCardInfo({ ...cardInfo, priority: "High" })
                      }
                    >
                      High
                    </Button>
                  </Button.Group>
                </div>
              )}
            </div>
            <div>
              <Label
                value={
                  props.isHost
                    ? "Assign this task to:"
                    : "This task is assigned to:"
                }
              />
              <ul className="p-2">
                {props.members.map((member, id) => (
                  <li key={id} className="flex items-center gap-4 mb-2">
                    {props.isHost && (
                      <Checkbox
                        onChange={handleChange}
                        name="assignedTo"
                        value={member.id}
                      />
                    )}
                    <Label className="flex items-center gap-4">
                      <Avatar img={member.avatar} />
                      <div>{member.name}</div>
                    </Label>
                  </li>
                ))}
              </ul>
            </div>
            {error && (
              <Alert color="failure">
                <span className="flex gap-4 items-center">
                  <Exclamation />
                  <span className="font-medium">{errorMessage}</span>
                </span>
              </Alert>
            )}

            {props.isHost && (
              <div className="flex flex-wrap gap-6 my-auto">
                <div className="ml-auto flex flex-wrap gap-6">
                  <Button
                    color="gray"
                    onClick={() => {
                      setShowEditTask(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="failure"
                    onClick={() => setShowDeleteTask(true)}
                  >
                    Delete
                  </Button>
                  <Button disabled={isLoading} onClick={onSubmit}>
                    Confirm
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showDeleteTask}
        size="xl"
        popup={true}
        onClose={() => setShowDeleteTask(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Are you sure to delete this task?
            </h3>
            <div className="flex flex-wrap gap-6 my-auto">
              <div className="ml-auto flex flex-wrap gap-6">
                <Button
                  color="gray"
                  onClick={() => {
                    setShowEditTask(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="failure"
                  disabled={isLoading}
                  onClick={deleteTask}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );

  function handleChange(event: { target: { name: any; value: any } }) {
    setError(false);
    setCardInfo({
      ...cardInfo,
      [event.target.name]: event.target.value,
    });
  }
  function onSubmit() {
    setLoad(true);

    let checkDuplicate = undefined;
    if (card.title !== cardInfo.title) {
      checkDuplicate = props.board.taskColumnDetail.find((column) => {
        return column.title === cardInfo.title;
      });
    }

    if (checkDuplicate !== undefined) {
      setError(true);
      setErrorMessage("The card title already exists in this board!");
      setLoad(false);
      return;
    }

    const findCardIndex = props.board.taskColumnDetail.findIndex(
      (cardInfo) => cardInfo.title === card.title
    );

    let newCard = Array.from(props.board.taskColumnDetail);
    newCard[findCardIndex] = cardInfo;

    const newColumn: Board = {
      title: props.board.title,
      taskColumnDetail: newCard,
    };

    const findBoardIndex = props.channel.boards.findIndex(
      (board) => board.title === newColumn.title
    );

    let newBoards = Array.from(props.channel.boards);
    newBoards[findBoardIndex] = newColumn;

    store.dispatch(
      updateBoards({
        boards: newBoards,
        idChannel: props.channel.id,
      })
    );
    updateTaskColumn(newColumn, props.channel.id);
    setLoad(false);
    setShowEditTask(false);
  }
  function deleteTask() {
    setLoad(true);
    const findCardIndex = props.board.taskColumnDetail.findIndex(
      (cardInfo) => cardInfo.title === card.title
    );

    let newCard = Array.from(props.board.taskColumnDetail);

    newCard.splice(findCardIndex, 1);
    const newColumn: Board = {
      title: props.board.title,
      taskColumnDetail: newCard,
    };

    const findBoardIndex = props.channel.boards.findIndex(
      (board) => board.title === newColumn.title
    );

    let newBoards = Array.from(props.channel.boards);
    newBoards[findBoardIndex] = newColumn;

    store.dispatch(
      updateBoards({
        boards: newBoards,
        idChannel: props.channel.id,
      })
    );
    updateTaskColumn(newColumn, props.channel.id);
    setLoad(false);
    setShowDeleteTask(false);
    setShowEditTask(false);
  }
}

export default TaskCard;
