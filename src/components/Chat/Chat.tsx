import React, { useState, useCallback, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Button, TextInput } from "flowbite-react";
import { getUserProfile } from "../../services/api";
const Chat = (props: { avatar: string; userId: number }) => {
  const socketUrl = `ws://www.vinhtc27.social/channel/chat?channelId=2&token=${localStorage.getItem(
    "token"
  )}`;
  const ws = new WebSocket(socketUrl);
  const [messageHistory, setMessageHistory] = useState([]);
  const [mess, setMess] = useState();
  const didUnmount = useRef(false);
  const [otherAva, setOtherAva] = useState();
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
      <Button onClick={() => getAvatar(2)}></Button>
    </div>
  );
  function ms(value: any, idx: any) {
    if (JSON.parse(value.data).senderId !== props.userId)
      //getAvatar(JSON.parse(value.data).senderId);
      return (
        <div key={idx} className="chat-message">
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                {[JSON.parse(value.data).content]}
              </div>
              <img
                src={`${otherAva}`}
                alt="ava"
                className="w-6 h-6 rounded-full order-1"
              ></img>
            </div>
          </div>
        </div>
      );
    else
      return (
        <div key={idx} className="chat-message">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              <div className="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white">
                {[JSON.parse(value.data).content]}
              </div>
              <img
                src={props.avatar}
                alt="ava"
                className="w-6 h-6 rounded-full order-2"
              ></img>
            </div>
          </div>
        </div>
      );
  }
  async function getAvatar(userID: number) {
    let ava: any = await getUserProfile(userID);
    setOtherAva(ava.avatar);
  }

  function c() {
    console.log(otherAva);
  }
  function handleChange(event: { target: { value: any } }) {
    setMess(event.target.value);
  }
};
export default Chat;
