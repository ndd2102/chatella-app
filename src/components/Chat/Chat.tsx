import React, { useState, useCallback, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Avatar, Button, Label, Modal, TextInput } from "flowbite-react";
import { getChannel, getUserProfile } from "../../services/api";

import { Profile } from "../../types/profile";
import { Channel } from "../../types/channel";
const Chat = (props: { profile: Profile; channel: Channel }) => {
  const socketUrl = `ws://w42g11.int3306.freeddns.org//channel/chat?channelId=${
    props.channel.id
  }&token=${localStorage.getItem("token")}`;
  const [messageHistory, setMessageHistory] = useState([]);
  const [mess, setMess] = useState<string>("");
  const [show, setShow] = useState(false);
  const [channel, setChannel] = useState(props.channel);
  const [otherAva, setOtherAva] = useState<Profile[]>([]);
  const didUnmount = useRef(false);
  const ws = new WebSocket(socketUrl);
  const { sendJsonMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => {
      /*
      useWebSocket will handle unmounting for you, but this is an example of a 
      case in which you would not want it to automatically reconnect
    */
      return didUnmount.current === false;
    },
    reconnectAttempts: 10,
    reconnectInterval: 0,
  });
  useEffect(() => {
    ws.onmessage = (e: any) => {
      setMessageHistory((prev) => prev.concat(e));
    };
    return () => {
      didUnmount.current = true;
    };
  }, []);

  useEffect(() => {
    // const ChannelInfo = async () => {
    //   setChannel(await getChannel(channel.id));
    // };
    // ChannelInfo();
    const fetchUserlList = async () => {
      const list = await Promise.all(
        channel.members.map(async (value) => {
          return await getUserProfile(value.userId);
        })
      );
      setOtherAva(list);
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
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <div className="sm:items-center justify-between py-3 border-b-2 border-gray-200">
        {/* <div className="relative flex items-center space-x-4"> */}
        <div className="mb-5">
          <span className="text-xl font-bold">Member ({otherAva.length})</span>
          <span
            className="float-right pr-6 underline text-slate-500"
            onClick={() => setShow(true)}
          >
            Tất cả
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
            <Modal.Header>Danh sách thành viên</Modal.Header>
            <Modal.Body>
              <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col max-h-[50vh] overflow-y-auto">
                {otherAva.map((userId, id) => (
                  <div key={id}>
                    <Label className="inline-flex justify-center items-center ml-4 text-lg ">
                      <Avatar img={userId.avatar} />
                      <div className="p-6 ml-6">{userId.name}</div>
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
          </div>
          <span className="text-lg text-gray-600 tracking-wide truncate">
            The WebSocket is currently {connectionStatus}
          </span>
        </div>
      </div>
      {/* </div> */}
      <div
        id="chatArea"
        className=" flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {messageHistory.slice(1).map(ms)}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <input
            id="myInput"
            type="text"
            placeholder="Write your message!"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 bg-gray-200 rounded-md py-3"
            onChange={handleChange}
            value={mess}
          ></input>
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              id="myBtn"
              type="button"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              onClick={handleClickSendMessage}
            >
              <span className="font-bold">Send</span>
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

  function ms(value: any, idx: any) {
    const avatar = otherAva.find((obj) => {
      return obj.id === JSON.parse(value.data).senderId;
    });
    if (JSON.parse(value.data).senderId !== props.profile.userId) {
      return (
        <div key={idx} className="chat-message">
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                {[JSON.parse(value.data).content]}
              </div>

              <img
                src={avatar?.avatar}
                alt="ava"
                className="w-6 h-6 rounded-full order-1"
                onClick={() => console.log(avatar?.name)}
              ></img>
            </div>
          </div>
        </div>
      );
    } else
      return (
        <div key={idx} className="chat-message">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              <div className="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white">
                {[JSON.parse(value.data).content]}
              </div>
              <img
                src={avatar?.avatar}
                alt="ava"
                className="w-6 h-6 rounded-full order-2"
              ></img>
            </div>
          </div>
        </div>
      );
  }
  function handleChange(event: { target: { value: any } }) {
    setMess(event.target.value);
  }
};
export default Chat;
