import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Avatar, Badge, Label, Modal } from "flowbite-react";
import { getUserProfile } from "../../services/api";

import { Profile } from "../../types/profile";
import { Channel } from "../../types/channel";
const Chat = (props: { profile: Profile; channel: Channel }) => {
  const socketUrl = `ws://w42g11.int3306.freeddns.org//channel/chat?channelId=${
    props.channel.id
  }&token=${localStorage.getItem("token")}`;
  const [messageHistory, setMessageHistory] = useState<any>([]);
  const [mess, setMess] = useState<any>("");
  const [show, setShow] = useState(false);
  const [nameUser, setNameUser] = useState<string>();
  const [channel, setChannel] = useState<Channel>();
  const [otherAva, setOtherAva] = useState<Profile[]>([]);
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
    if (lastMessage !== null) {
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
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <div className="sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="mb-5">
          <span className="text-xl font-bold">Member ({otherAva.length})</span>
          <span
            className="float-right pr-6 underline text-slate-500 hover:cursor-pointer hover:text-slate-600"
            onClick={() => setShow(true)}
          >
            See all
          </span>
        </div>
        <React.Fragment>
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
            show={show}
            size="md"
            popup={true}
            onClose={() => setShow(false)}
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
        </React.Fragment>

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
          <div className="right-0 items-center inset-y-0 hidden sm:flex">
            <button
              id="myBtn"
              type="button"
              className=" rounded-lg px-4 py-3  duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
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
  );

  function handleChange(event: { target: { value: any } }) {
    setMess(event.target.value);
  }

  function convertTZ(date: any, tzString: any) {
    return new Date(
      typeof date === "string" ? new Date(date) : date
    ).toLocaleString("en-US", { timeZone: tzString });
  }

  function check(value: any, idx: any) {
    const avatar = otherAva.find((obj) => {
      return obj.id === JSON.parse(value.data).senderId;
    });
    const today = new Date();
    const getTimeToday =
      today.getMonth() +
      1 +
      "/" +
      today.getDate() +
      "/" +
      today.getFullYear() +
      ",";
    const time = convertTZ(
      `${[JSON.parse(value.data).timestamp]} +0000`,
      "Asia/Jakarta"
    );
    let getTime = time.split(" ");
    let time1 = getTime[1] ? time.substring(time.indexOf(" ") + 1) : "";
    if (
      JSON.parse(value.data).type === "chat" &&
      JSON.parse(value.data).senderId !== props.profile.userId
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
                {getTime[0] === getTimeToday ? time1 : getTime[0]}
              </span>
            </div>
          </div>
        </div>
      );
    } else if (
      JSON.parse(value.data).type === "chat" &&
      JSON.parse(value.data).senderId === props.profile.userId
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
                {getTime[0] === getTimeToday ? time1 : getTime[0]}
              </span>
            </div>
          </div>
        </div>
      );
    } else if (JSON.parse(value.data).type === "delete") {
      return (
        <div key={idx} className="chat-message">
          <div className="text-center text-xs">{nameUser} đã rời khỏi nhóm</div>
        </div>
      );
    } else if (JSON.parse(value.data).type === "add") {
      return (
        <div key={idx} className="chat-message">
          <div className="text-center text-xs">
            {nameUser} đã được thêm vào nhóm
          </div>
        </div>
      );
    }
  }
};
export default Chat;
