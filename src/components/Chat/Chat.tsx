import React, { useState, useCallback, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Avatar, Button, TextInput } from "flowbite-react";
import { getUserProfile } from "../../services/api";

import { Profile } from "../../types/profile";
import { Channel } from "../../types/channel";
const Chat = (props: { profile: Profile; channel: Channel }) => {
  const socketUrl = `ws://w42g11.int3306.freeddns.org//channel/chat?channelId=${
    props.channel.id
  }&token=${localStorage.getItem("token")}`;
  const [messageHistory, setMessageHistory] = useState([]);
  const [mess, setMess] = useState<string>();
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
    const fetchUserlList = async () => {
      const list = await Promise.all(
        props.channel.members.slice(0).map(async (value) => {
          return await getUserProfile(value.userId);
        })
      );
      setOtherAva(list);
    };
    fetchUserlList();
  }, []);
  setTimeout(() => {
    let objDiv: any = document.getElementById("chatArea");

    objDiv.scrollTop = objDiv.scrollHeight;
  }, 0);
  const handleClickSendMessage = useCallback(() => {
    if (mess !== undefined && mess !== "") {
      sendJsonMessage({ content: `${mess}` });
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
    <form>
      <span className="inline-flex justify-center items-center ml-4 text-lg">
        <Avatar
          img={props.channel.avatar}
          rounded={true}
          status="online"
          statusPosition="bottom-right"
        />
      </span>
      <span className="p-4 text-lg tracking-wide truncate">
        {props.channel.name}
      </span>
      <div>The WebSocket is currently {connectionStatus}</div>
      <div
        id="chatArea"
        className="h-[600px] flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {messageHistory.map(ms)}
      </div>
      <TextInput id="text" onChange={handleChange}></TextInput>
      <Button
        type="reset"
        onClick={handleClickSendMessage}
        // disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send
      </Button>
    </form>
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
    setMess(event.target.value.trim());
  }
};
export default Chat;
