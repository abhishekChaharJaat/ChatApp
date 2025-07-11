import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../Redux/slices/messageSlice";
import { setActiveUser } from "../Redux/slices/userSlice";

const WebsocketContext = createContext();

const WebsocketProvider = ({ children, url }) => {
  const dispatch = useDispatch();
  const { userId } = useAuth();
  const token = useSelector((state) => state.user.token);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  // Handle received messages
  const receivedMessage = (data) => {
    if (data.type === "new_message") {
      dispatch(addMessage(data));
    } else if (data.type === "active_status") {
      dispatch(setActiveUser(data.users));
    }
  };

  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        const wsUrl = `${url}?token=${token}&userId=${userId}`;
        const webSocket = new WebSocket(wsUrl);
        setSocket(webSocket);

        webSocket.onopen = () => {
          console.log("WebSocket Connected");
          setIsConnected(true);
          setConnectionStatus("Connected");
        };

        webSocket.onmessage = (event) => {
          try {
            const receivedData = JSON.parse(event.data);
            receivedMessage(receivedData);
          } catch (error) {
            console.error("Error parsing message:", error);
          }
        };

        webSocket.onclose = () => {
          console.log("WebSocket Disconnected");
          setIsConnected(false);
          setSocket(null);
        };

        webSocket.onerror = (error) => {
          console.error("WebSocket Error:", error);
        };
      } catch (error) {
        console.error("Error connecting to WebSocket:", error);
      }
    };

    if (token) {
      connectWebSocket();
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    };
  }, [url, token, userId, dispatch, socket]);

  const createMessage = (type, payload, recipientId, senderId) => {
    return {
      type: type,
      recipientId: recipientId,
      content: payload,
      senderId: senderId,
    };
  };

  const sendMessage = (message) => {
    setMessages((prev) => [
      ...prev,
      {
        text: message.content,
        received: false,
      },
    ]);

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  return (
    <WebsocketContext.Provider
      value={{
        isConnected,
        messages,
        connectionStatus,
        setMessages,
        createMessage,
        sendMessage,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocket = () => {
  const context = useContext(WebsocketContext);
  return context;
};

export default WebsocketProvider;
