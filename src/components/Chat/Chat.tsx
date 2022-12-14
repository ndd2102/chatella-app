import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Avatar, Badge, Button, Label, Modal } from "flowbite-react";
import { getUserProfile } from "../../services/api";
import { GiExitDoor, GiEntryDoor } from "react-icons/gi";
import { Profile } from "../../types/profile";
import { Channel } from "../../types/channel";
import EmojiPicker from "emoji-picker-react";
import { addMinutes, format } from "date-fns";
import AvatarGroupCounter from "flowbite-react/lib/esm/components/Avatar/AvatarGroupCounter";
import { useStore } from "../../state/storeHooks";
import { MemberProfile } from "../Modal/UserInfo/MemberProfile";

const Chat = (props: {
  profile: Profile;
  channel: Channel;
  memberList: Profile[];
  isHost: Boolean;
}) => {
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
        Number(JSON.parse(lastMessage.data).content) === profile.id &&
        Number(JSON.parse(lastMessage.data).senderId) !==
          Number(JSON.parse(lastMessage.data).content)
      )
        setShow(true);
    }
  }, [lastMessage]);

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
      <div className="flex-1 justify-between flex flex-col h-screen">
        <div className="sm:items-center mt-4 justify-between py-3 border-b border-gray-200">
          <div className="mb-5 ml-4">
            <span className="text-xl font-bold">
              Member ({props.memberList.length})
            </span>
            <span
              className="float-right pr-6 underline text-slate-500 hover:cursor-pointer hover:text-blue-600"
              onClick={() => setShowMembers(true)}
            >
              See all
            </span>
          </div>
          <div className="ml-6">
            <Avatar.Group>
              {props.memberList.map((value, index) => {
                if (index > 7) {
                  return (
                    <AvatarGroupCounter
                      total={props.memberList.length - index}
                    />
                  );
                } else {
                  return (
                    <Avatar
                      key={index}
                      img={value.avatar}
                      rounded={true}
                      stacked={true}
                    />
                  );
                }
              })}
            </Avatar.Group>
          </div>
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
                {props.memberList.map((userId, index) => (
                  <div key={index} className="space-y-2 mt-2">
                    <Label className="inline-flex justify-center items-center text-lg ">
                      <MemberProfile profile={userId} channel={props.channel} />
                    </Label>
                  </div>
                ))}
              </div>
            </Modal.Body>
          </Modal>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-black-700 ml-6 font-bold mr-3 tracking-wide truncate">
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
          className=" flex flex-col space-y-4 p-4 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {messageHistory.slice(1).map(check)}
        </div>
        <div className="border-t-2 border-gray-200 p-4">
          <div className="relative flex">
            <textarea
              id="myInput"
              placeholder="Write your message!"
              className="w-11/12 focus:outline-none resize-none break-words pr-16 h-12 focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-full "
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
                onClick={handleShowEmoji}
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
                className=" rounded-full p-2 h-12 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
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
      {!props.isHost && (
        <Modal show={show} size="md" popup={true}>
          <Modal.Body>
            <div className="space-y-6 px-6 sm:pb-2 lg:px-3 xl:pb-3">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white p-6 text-center">
                You was kick by host
              </h3>
              <div className="justify-center text-center">
                <div className=" flex flex-column justify-center text-center">
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
      )}
    </React.Fragment>
  );
  function handleShowEmoji() {
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
    const avatar = props.memberList.find((obj) => {
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
            <div className="space-y-2 text-sm max-w-xs mx-2 order-1 items-start">
              <div className="w-full px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600 break-words">
                {[JSON.parse(value.data).content]}
              </div>
            </div>
            <img
              src={
                avatar?.avatar ||
                "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
              }
              alt="ava"
              className="w-6 h-6 rounded-full float-left"
            ></img>
          </div>
          <span className="block text-left pl-10 text-xs">
            {getDay === today ? getTime : getDay}
          </span>
        </div>
      );
    } else if (
      JSON.parse(value.data).type === "chat" &&
      JSON.parse(value.data).senderId === props.profile.id
    ) {
      return (
        <div key={idx} className="chat-message">
          <div className="flex items-end justify-end">
            <div className="space-y-2 text-sm max-w-xs mx-2 order-1 items-end">
              <div className="w-full px-4 py-2 rounded-lg inline-block bg-blue-600 text-white break-words">
                {[JSON.parse(value.data).content]}
              </div>
            </div>
            <img
              src={avatar?.avatar}
              alt="ava"
              className="w-6 h-6 rounded-full order-2 float-right"
            ></img>
          </div>
          <span className="block text-right pr-10 text-xs">
            {getDay === today ? getTime : getDay}
          </span>
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
