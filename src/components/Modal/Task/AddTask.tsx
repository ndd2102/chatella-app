import {
  Modal,
  Label,
  TextInput,
  Button,
  Textarea,
  Avatar,
  Checkbox,
  Alert,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Card } from "../../../types/card";
import { IoAddCircle } from "react-icons/io5";
import { Channel } from "../../../types/channel";
import { Profile } from "../../../types/profile";
import { Board } from "../../../types/board";
import { store } from "../../../state/store";
import { updateBoards } from "../../../pages/Workspace/Workspace.slice";
import { Exclamation } from "heroicons-react";
import { updateTaskColumn } from "../../../services/api";

function AddTask(props: {
  channel: Channel;
  board: Board;
  members: Profile[];
}) {
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
  const [memberList, setMemberList] = useState<Profile[]>(props.members);
  const [assigned, setAssigned] = useState<string[]>([]);

  useEffect(() => {
    setMemberList(props.members);
  }, [props.members]);
  useEffect(() => {
    setCardInfo({ ...cardInfo, assignedTo: assigned });
  }, [assigned]);

  return (
    <div>
      <React.Fragment>
        <span
          onClick={() => setShow(true)}
          className="flex text-lg hover:text-gray-500 hover:cursor-pointer text-gray-400"
        >
          <IoAddCircle />
        </span>
        <Modal
          show={show}
          size="3xl"
          popup={true}
          onClose={() => setShow(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8 font-lexend">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Add a card
              </h3>
              <div className="block md:gap-6 space-y-4">
                <div>
                  <Label value="Task Name" />
                  <TextInput
                    required={true}
                    id="title"
                    name="title"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label value="Task Description" />
                  <Textarea
                    id="description"
                    name="description"
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
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-1">
                  <Label className="w-full" value="Priority" />
                  <Button.Group className="w-full" outline={false}>
                    <Button
                      color="success"
                      onClick={() =>
                        setCardInfo({ ...cardInfo, priority: "Low" })
                      }
                    >
                      Low
                    </Button>
                    <Button
                      color="warning"
                      onClick={() =>
                        setCardInfo({ ...cardInfo, priority: "Medium" })
                      }
                    >
                      Medium
                    </Button>
                    <Button
                      color="failure"
                      onClick={() =>
                        setCardInfo({ ...cardInfo, priority: "High" })
                      }
                    >
                      High
                    </Button>
                  </Button.Group>
                </div>
              </div>
              <div>
                <Label value="Assign this task to:" />
                <ul className="p-2">
                  {memberList.map((member, index) => (
                    <li key={index} className="flex items-center gap-4 mb-2">
                      <Checkbox
                        onChange={handleChangeAssigned}
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
      </React.Fragment>
    </div>
  );

  function handleChange(event: { target: { name: any; value: any } }) {
    setError(false);
    setCardInfo({
      ...cardInfo,
      [event.target.name]: event.target.value,
    });
  }
  function handleChangeAssigned(event: { target: { value: any } }) {
    let isCheck = event.target.value;

    const first = assigned.find((obj) => {
      return obj === isCheck;
    });
    if (first === undefined) {
      setAssigned((pre) => [...pre, isCheck]);
    } else
      setAssigned((member) =>
        member.filter((current) => {
          return current !== isCheck;
        })
      );
  }
  function onSubmit() {
    setLoad(true);
    const checkDuplicate = props.board.taskColumnDetail.find((column) => {
      return column.title === cardInfo.title;
    });

    if (checkDuplicate !== undefined) {
      setError(true);
      setErrorMessage("The card title already exists in this board!");
      setLoad(false);
      return;
    }

    const newColumn: Board = {
      title: props.board.title,
      taskColumnDetail: [...props.board.taskColumnDetail, cardInfo],
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
    setShow(false);
  }
}

export default AddTask;
