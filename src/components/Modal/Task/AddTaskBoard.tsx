import { Modal, Label, TextInput, Button, Toast } from "flowbite-react";
import { Exclamation } from "heroicons-react";
import React, { useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { updateBoards } from "../../../pages/Workspace/Workspace.slice";
import { addTaskColumn } from "../../../services/api";
import { store } from "../../../state/store";
import { Board } from "../../../types/board";
import { Channel } from "../../../types/channel";

function AddTaskBoard(props: { channel: Channel }) {
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setLoad] = useState(false);

  return (
    <div>
      <React.Fragment>
        <button
          onClick={() => setShow(true)}
          className="border-2 hover:text-gray-500 hover:border-gray-500 hover:cursor-pointer text-gray-400 border-dashed p-2 rounded-md"
        >
          <div className="w-full gap-2 text-sm flex justify-center flex-row items-center">
            <FiPlusSquare className="font-semibold" /> <p>New board</p>
          </div>
        </button>
        <Modal
          show={show}
          size="md"
          popup={true}
          onClose={() => setShow(false)}
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
                    setLoad(false);
                    setNewBoardTitle(e.target.value);
                  }}
                  value={newBoardTitle}
                />
              </div>
              {error && (
                <Toast>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                    <Exclamation className="h-5 w-5" />
                  </div>
                  <div className="ml-3 text-sm font-normal">{errorMessage}</div>
                  <Toast.Toggle />
                </Toast>
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

  async function onSubmit() {
    setLoad(true);
    const checkDuplicate = props.channel.boards.find((board) => {
      return board.title === newBoardTitle;
    });

    if (checkDuplicate !== undefined) {
      setError(true);
      setErrorMessage("This board already exists!");
      setLoad(false);
      return;
    }
    const newBoard: Board = {
      title: newBoardTitle,
      taskColumnDetail: [],
    };

    store.dispatch(
      updateBoards({
        boards: [...props.channel.boards, newBoard],
        idChannel: props.channel.id,
      })
    );
    await addTaskColumn(newBoard, props.channel.id);
    setLoad(false);
    setShow(false);
    setNewBoardTitle("");
  }
}

export default AddTaskBoard;
