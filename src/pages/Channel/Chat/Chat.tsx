import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
const App = () => {
  //Public API that will echo messages sent to it back to the client
  const socketUrl = //"wss://echo.websocket.events";
    "ws://www.vinhtc27.social/channel/chat?channelId=1&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoie1widXNlcklkXCI6NCxcImFjY291bnRJZFwiOjQsXCJ1dWlkXCI6XCJcIixcImVtYWlsXCI6XCJcIn0iLCJleHAiOjE2Njk5MDM5NTR9.LmLnqFiBVndkXouRsVl3SU8S_Far3bWdaPF3A1uyxHurw4ZyrVb3K301YjPvo8KSnTKTNo_hC-KUf9ji_0Aq97I-DT0bV-tfp_aoRxjmcCdi43lrOo6OQieicOCJKyLEHa1ZRk0bfzFQweaUmBetbSuoeunt0AWylYcYirZ-ROE9G-lCMHbhyT6XJFY9L5XCbSdx48snWxpTCEucsgfls0yBfRx4ZJr9PjIIEBwH8FWkZRm165OAUFA9hdaBUjaqvQNu1aFmD45aLP95b1kFimK-f_-dO1d4x1cv2p8upPLZ9g0t9YY1CbkDNoWh9DfqKcMdyOxo__98QVVu4PjQAi1vsl161_uBYQxWHLvzfQUP8znSz8KykFLVPLQmAKjstq3pRU6YzKKxHk5Vaac4DAY2SrHDv6za_HPlN1G5CEWzyNjjKqSH0k6bPkgksBgSFbr-zKsENWaI_SbT9xw5Sieci3UlFWoV7mVnEAPjX8FO6UvV964cNMaRsAkgRf90j-Fqqf5D_wCc4ozJe7MX6pd2bvQH0vZwDYglvJffnPceJMyQqGH5SF7GFRJMdI2Zt_OEOMjlP_ZQTIkExbkkdfvoEhZxbFPVOQO1hwf38XsR_p4HAddjGiBlhfYdrAyvbSx8_yt9XhjKGQtv9xZ9OdOrEZF2NUenCOwamRUWFLU";
  const ws = new WebSocket(socketUrl);
  const [messageHistory, setMessageHistory] = useState([]);

  const [mess, setMess] = useState();

  const { sendJsonMessage, readyState } = useWebSocket(socketUrl);
  useEffect(() => {
    ws.onmessage = (e: any) => {
      setMessageHistory((prev) => prev.concat(e));
    };
  }, []);
  //useEffect(() => {
  //   if (lastMessage !== null) {
  //     setMessageHistory((prev) => prev.concat(lastMessage));
  //   }
  // }, [lastMessage, setMessageHistory]);

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
      <input onChange={handleChange}></input>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      <ul>
        {messageHistory.map((message: any, idx) => (
          <div key={idx}>{JSON.parse(message.data).content}</div>
        ))}
      </ul>
    </div>
  );
  function handleChange(event: { target: { value: any } }) {
    setMess(event.target.value);
  }
};
export default App;
