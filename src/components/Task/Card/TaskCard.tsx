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
import { Card } from "../../../types/card";
import { Channel } from "../../../types/channel";
import { Profile } from "../../../types/profile";

function TaskCard(props: { card: Card; channel: Channel; members: Profile[] }) {
  const [card, setCard] = useState<Card>(props.card);
  const initialState: Card = {
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    assignedTo: [],
  };
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [cardInfo, setCardInfo] = useState<Card>(initialState);
  const [isLoading, setLoad] = useState(false);

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
        onClick={() => setShow(true)}
        className="p-4 rounded-lg bg-white my-2 h-36 drop-shadow hover:bg-neutral-50 hover:cursor-pointer"
      >
        <h3 className="font-base text-lg">{card.title}</h3>
        <p className="mt-1.5 h-12 text-base truncated text-gray-400 font-light">
          {card.description}
        </p>
        <div className="flex justify-between">
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
          <div className="-mb-8">
            <Avatar.Group>
              {props.members.map((member, index) => {
                if (index > 4) {
                  return (
                    <AvatarGroupCounter
                      total={props.members.length - index - 1}
                    />
                  );
                } else
                  return (
                    <Avatar
                      key={index}
                      img={member.avatar}
                      rounded={true}
                      stacked={true}
                    />
                  );
              })}
            </Avatar.Group>
          </div>
        </div>
      </div>
      <Modal show={show} size="3xl" popup={true} onClose={() => setShow(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit card
            </h3>
            <div className="block md:gap-6 space-y-4">
              <div>
                <Label value="Task Name" />
                <TextInput
                  required={true}
                  id="title"
                  name="title"
                  defaultValue={card.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Task Description" />
                <Textarea
                  className="font-normal text-sm"
                  id="description"
                  name="description"
                  defaultValue={card.description}
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
                  defaultValue={card.dueDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-1">
                <Label className="w-full" value="Priority" />
                <Button.Group className="w-full" outline={false}>
                  <Button color="gray">Low</Button>
                  <Button color="warning">Medium</Button>
                  <Button color="failure">High</Button>
                </Button.Group>
              </div>
            </div>
            <div>
              <Label value="Assign this task to:" />
              <ul className="p-2">
                {props.members.map((member, id) => (
                  <li key={id} className="flex items-center gap-4 mb-2">
                    <Checkbox
                      onChange={handleChange}
                      name="assignedTo"
                      value={member.id}
                    />
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
            <div className="flex flex-wrap gap-6 my-auto">
              <div className="ml-auto flex flex-wrap gap-6">
                <Button
                  color="gray"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} onClick={onSubmit}>
                  Confirm
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
    // const checkDuplicate = props.board.taskColumnDetail.find((column) => {
    //   return column.title === cardInfo.title;
    // });

    // if (checkDuplicate !== undefined) {
    //   setError(true);
    //   setErrorMessage("The card title already exists in this board!");
    //   setLoad(false);
    //   return;
    // }

    // const newColumn: Board = {
    //   title: props.board.title,
    //   taskColumnDetail: [...props.board.taskColumnDetail, cardInfo],
    // };

    // const findBoardIndex = props.channel.boards.findIndex(
    //   (board) => board.title === newColumn.title
    // );
    // let newBoards = Array.from(props.channel.boards);
    // newBoards[findBoardIndex] = newColumn;

    // store.dispatch(
    //   updateBoards({
    //     boards: newBoards,
    //     idChannel: props.channel.id,
    //   })
    // );
    setLoad(false);
    setShow(false);
  }
}

export default TaskCard;