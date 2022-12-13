import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Alert, Avatar, Badge, Button, Label, Modal } from "flowbite-react";
import { getUserProfile } from "../../services/api";
import { GiExitDoor, GiEntryDoor } from "react-icons/gi";
import { Profile } from "../../types/profile";
import { Channel } from "../../types/channel";
import EmojiPicker from "emoji-picker-react";
import { addMinutes, format } from "date-fns";
import { useStore } from "../../state/storeHooks";

const Chat = (props: { profile: Profile; channel: Channel }) => {
  const socketUrl = `ws://w42g11.int3306.freeddns.org//channel/chat?channelId=${
    props.channel.id
  }&token=${localStorage.getItem("token")}`;
  const [messageHistory, setMessageHistory] = useState<any>([]);
  const [mess, setMess] = useState<any>("");
  const [showMembers, setShowMembers] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [show, setShow] = useState(false);
  const [nameUser, setNameUser] = useState<string>();
  const [channel, setChannel] = useState<Channel>();
  const [otherAva, setOtherAva] = useState<Profile[]>([]);
  const { profile } = useStore(({ app }) => app);
  const { sendJsonMessage, readyState, lastMessage } = useWebSocket(socketUrl, {
    shouldReconnect: (CloseEvent) => true,
  });

  useEffect(() => {
    if (props.channel.id !== channel?.id) {
      setMessageHistory([]);
      setChannel(props.channel);
    }
  }, [props.channel.id]);

  useEffect(() => {
    if (lastMessage !== null && JSON.parse(lastMessage.data).type !== "ping") {
      setMessageHistory((prev: any) => prev.concat(lastMessage));
      const fetchUserName = async () => {
        if (
          JSON.parse(lastMessage.data).type === "delete" ||
          JSON.parse(lastMessage.data).type === "add"
        ) {
          const name = await getUserProfile(
            JSON.parse(lastMessage.data).content
          );
          setNameUser(name.name);
        }
      };
      fetchUserName();
      if (
        JSON.parse(lastMessage.data).type === "delete" &&
        Number(JSON.parse(lastMessage.data).content) === profile.id
      )
        setShow(true);
    }
  }, [lastMessage]);

  useEffect(() => {
    const fetchUserlList = async () => {
      if (channel !== undefined) {
        const list = await Promise.all(
          channel.members.map(async (value: { userId: number }) => {
            return await getUserProfile(value.userId);
          })
        );
        setOtherAva(list);
      }
    };
    fetchUserlList();
  }, [channel]);

  setTimeout(() => {
    let objDiv: any = document.getElementById("chatArea");
    objDiv.scrollTop = objDiv.scrollHeight;
    let input = document.getElementById("myInput");
    input?.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("myBtn")?.click();
      }
    });
  }, 0);
  const handleClickSendMessage = useCallback(() => {
    if (mess !== undefined && mess !== "") {
      sendJsonMessage({ content: `${mess.trim()}` });
    }
    setMess("");
  }, [mess, sendJsonMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Online",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Offline",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <React.Fragment>
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
        <div className="sm:items-center justify-between py-3 border-b-2 border-gray-200">
          <div className="mb-5">
            <span className="text-xl font-bold">
              Member ({otherAva.length})
            </span>
            <span
              className="float-right pr-6 underline text-slate-500 hover:cursor-pointer hover:text-slate-600"
              onClick={() => setShowMembers(true)}
            >
              See all
            </span>
          </div>
          <Avatar.Group>
            {otherAva.map((value, id) => (
              <Avatar
                key={id}
                img={value.avatar}
                rounded={true}
                stacked={true}
              />
            ))}
          </Avatar.Group>
          <Modal
            show={showMembers}
            size="md"
            popup={true}
            onClose={() => setShowMembers(false)}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="sm:pb-6 lg:px-8 xl:pb-8">
                <h3 className="text-xl font-medium mb-8 text-gray-900 dark:text-white">
                  All members
                </h3>
                {otherAva.map((userId, id) => (
                  <div key={id} className="space-y-2 mt-2">
                    <Label className="inline-flex justify-center items-center text-lg ">
                      <Avatar img={userId.avatar} />
                      <div className="ml-4">{userId.name}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </Modal.Body>
          </Modal>

          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-black-700 font-bold mr-3 tracking-wide truncate">
                Group Chat
              </span>
              <span className="flex gap-2">
                <Badge
                  color={connectionStatus === "Online" ? "success" : "failure"}
                >
                  {connectionStatus}
                </Badge>
              </span>
            </div>
          </div>
        </div>
        <div
          id="chatArea"
          className=" flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {messageHistory.slice(1).map(check)}
        </div>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <textarea
              id="myInput"
              placeholder="Write your message!"
              className="w-11/12 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-full "
              onChange={handleChange}
              value={mess}
            ></textarea>
            <div className="absolute right-16 items-center inset-y-0 hidden sm:flex">
              {showEmoji && (
                <div className="flex -mr-20 -mt-[30rem]">
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    lazyLoadEmojis={true}
                  />
                </div>
              )}
              <button
                type="button"
                onClick={handlShowEmoji}
                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="right-0 ml-1.5 items-center inset-y-0 hidden sm:flex">
              <button
                id="myBtn"
                type="button"
                className=" rounded-full p-2  duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                onClick={handleClickSendMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} size="md" popup={true}>
        <Modal.Body>
          <div className="space-y-6 px-6 pb-6 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              You was kick by host
            </h3>
            <div className="flex flex-wrap gap-6 my-auto">
              <div className="ml-auto flex flex-wrap gap-6">
                <Button
                  color="failure"
                  onClick={() => window.location.replace("/workspace")}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
  function handlShowEmoji() {
    setShowEmoji(!showEmoji);
  }

  function onEmojiClick(emojiObject: { emoji: any }) {
    setMess((prevInput: any) => prevInput + emojiObject.emoji);
    setShowEmoji(false);
  }
  function handleChange(event: { target: { value: any } }) {
    setMess(event.target.value);
  }

  function check(value: any, idx: any) {
    const avatar = otherAva.find((obj) => {
      return obj.id === JSON.parse(value.data).senderId;
    });
    const today = format(new Date(), "dd/MM");
    const time = new Date(JSON.parse(value.data).timestamp);
    const convertTZ = addMinutes(time, 420);
    const getDay = format(convertTZ, "dd/MM");
    const getTime = format(convertTZ, "HH:mm");

    if (
      JSON.parse(value.data).type === "chat" &&
      JSON.parse(value.data).senderId !== props.profile.id
    ) {
      return (
        <div key={idx} className="chat-message">
          <div className="flex items-start justify-start">
            <div className="space-y-2 text-xs max-w-xs mx-2 order-1 items-start">
              <div className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                {[JSON.parse(value.data).content]}
              </div>
              <img
                src={
                  avatar?.avatar ||
                  "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
                }
                alt="ava"
                className="w-6 h-6 rounded-full float-left m-2"
                onClick={() => console.log(avatar?.name)}
              ></img>
              <span className="block text-[9px]">
                {getDay === today ? getTime : getDay}
              </span>
            </div>
          </div>
        </div>
      );
    } else if (
      JSON.parse(value.data).type === "chat" &&
      JSON.parse(value.data).senderId === props.profile.id
    ) {
      return (
        <div key={idx} className="chat-message">
          <div className="flex items-end justify-end">
            <div className=" space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              <div className="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white">
                {[JSON.parse(value.data).content]}
              </div>
              <img
                src={avatar?.avatar}
                alt="ava"
                className="w-6 h-6 rounded-full order-2 float-right m-2"
              ></img>
              <span className="block text-[9px]">
                {getDay === today ? getTime : getDay}
              </span>
            </div>
          </div>
        </div>
      );
    } else if (JSON.parse(value.data).type === "delete") {
      return (
        <div key={idx} className="chat-message">
          <div className="justify-center items-center flex text-gray-500 text-xs">
            <GiExitDoor /> {nameUser} left the channel
          </div>
        </div>
      );
    } else if (JSON.parse(value.data).type === "add") {
      return (
        <div key={idx} className="chat-message">
          <div className="justify-center items-center flex text-gray-500 text-xs">
            <GiEntryDoor /> {nameUser} was added to the channel
          </div>
        </div>
      );
    }
  }
};
export default Chat;
