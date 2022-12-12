import {
  Alert,
  Button,
  Dropdown,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import { Exclamation } from "heroicons-react";
import React, { useState } from "react";
import { AiOutlineEllipsis, AiOutlineEdit } from "react-icons/ai";
import { FiMinusSquare } from "react-icons/fi";
import { updateBoards } from "../../../pages/Workspace/Workspace.slice";
import { deleteTaskColumn, updateTaskColumn } from "../../../services/api";
import { store } from "../../../state/store";
import { Board } from "../../../types/board";
import { Channel } from "../../../types/channel";

function EditTaskBoard(props: { board: Board; channel: Channel }) {
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <Dropdown
        label={
          <AiOutlineEllipsis className="flex text-lg hover:text-gray-600 hover:cursor-pointer text-gray-500" />
        }
        arrowIcon={false}
        inline={true}
      >
        <>
          <Dropdown.Item onClick={() => setShowEdit(true)}>
            <span className="bg-blue-50 p-2 text-2xl w-fit text-blue-700 hover:bg-blue-100 hover:cursor-pointer rounded-full">
              <AiOutlineEdit />
            </span>{" "}
            <span className="pl-2">Edit title</span>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => setShowDelete(true)}>
            <span className="bg-red-50 p-2 text-2xl w-fit text-red-700 hover:bg-red-100 hover:cursor-pointer rounded-full">
              <FiMinusSquare />
            </span>{" "}
            <span className="pl-2">Delete column</span>
          </Dropdown.Item>
        </>
      </Dropdown>
      <React.Fragment>
        <Modal
          show={showEdit}
          size="md"
          popup={true}
          onClose={() => setShowEdit(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8 font-lexend">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Add a board
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label value="Board title" />
                </div>
                <TextInput
                  placeholder="Your board title"
                  required={true}
                  onChange={(e) => {
                    setError(false);
                    setNewBoardTitle(e.target.value);
                  }}
                  value={newBoardTitle}
                />
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
                      setShowEdit(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={onSubmit}>Confirm</Button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
      <React.Fragment>
        <Modal
          show={showDelete}
          size="xl"
          popup={true}
          onClose={() => setShowDelete(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Are you sure to delete this column?
              </h3>
              <div className="flex flex-wrap gap-6 my-auto">
                <div className="ml-auto flex flex-wrap gap-6">
                  <Button
                    color="gray"
                    onClick={() => {
                      setShowDelete(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button color="failure" onClick={onSubmit}>
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </>
  );

  async function onSubmit() {
    if (showEdit) {
      if (newBoardTitle === props.board.title) {
        setShowEdit(false);
        return;
      } else {
        const checkDuplicateIndex =
          props.channel.boards.findIndex((board) => {
            return board.title === newBoardTitle;
          }) ?? -1;

        if (checkDuplicateIndex !== -1) {
          setError(true);
          setErrorMessage("This board already exists!");
          return;
        }

        const findBoardIndex =
          props.channel.boards.findIndex((board) => {
            return board.title === props.board.title;
          }) ?? -1;

        const newColumn: Board = {
          title: newBoardTitle,
          taskColumnDetail: props.board.taskColumnDetail,
        };

        let newBoards = Array.from(props.channel.boards);
        newBoards[findBoardIndex] = newColumn;
        store.dispatch(
          updateBoards({
            boards: newBoards,
            idChannel: props.channel.id,
          })
        );
        await updateTaskColumn(newColumn, props.channel.id);
      }
    }
    if (showDelete) {
      const findBoardIndex =
        props.channel.boards.findIndex((board) => {
          return board.title === props.board.title;
        }) ?? -1;
      let newBoards = Array.from(props.channel.boards);
      newBoards.splice(findBoardIndex, 1);
      store.dispatch(
        updateBoards({
          boards: newBoards,
          idChannel: props.channel.id,
        })
      );
      await deleteTaskColumn(props.board, props.channel.id);
    }
  }
}

export default EditTaskBoard;
