import React, { useState, useCallback, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Button, TextInput } from "flowbite-react";
import { getUserProfile } from "../../services/api";
import { Profile } from "../../types/profile";
import { Channel } from "../../types/channel";
const Chat = (props: { profile: Profile; channel: Channel }) => {
  const socketUrl = `ws://w42g11.int3306.freeddns.org//channel/chat?channelId=${
    props.channel.id
  }&token=${localStorage.getItem("token")}`;
  const ws = new WebSocket(socketUrl);
  const [messageHistory, setMessageHistory] = useState([]);
  const [mess, setMess] = useState();
  const didUnmount = useRef(false);
  const [otherAva, setOtherAva] = useState<Profile[]>([]);
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
  const handleClickSendMessage = useCallback(
    () => sendJsonMessage({ content: `${mess}` }),
    [mess, sendJsonMessage]
  );
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      <div className="p-6">Chat</div>
      <span>The WebSocket is currently {connectionStatus}</span>
      <div className="h-[600px] flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {messageHistory.map(ms)}
      </div>
      <TextInput onChange={handleChange}></TextInput>
      <Button
        onClick={handleClickSendMessage}
        // disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send
      </Button>
      {/* <Button onClick={getAvatar}></Button> */}
    </div>
  );

  function ms(value: any, idx: any) {
    if (JSON.parse(value.data).senderId !== props.profile.userId) {
      const avatar = otherAva.find((obj) => {
        return obj.id === JSON.parse(value.data).senderId;
      });
      //getAvatar(JSON.parse(value.data).senderId);
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
                src={props.profile.avatar}
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
