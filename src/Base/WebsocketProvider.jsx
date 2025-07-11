import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useAuth } from "@clerk/clerk-react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../Redux/slices/messageSlice";
import { setActiveUser } from "../Redux/slices/userSlice";

const WebsocketContext = createContext();

const WebsocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { userId } = useAuth();
  const token = useSelector((state) => state.user.token);

  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  const getWebSocketUrl = () => {
    const isLocal = window.location.hostname === "localhost";
    const baseUrl = isLocal
      ? "ws://localhost:8080/ws"
      : "wss://chatappbackend-dofk.onrender.com/ws";
    return `${baseUrl}?userId=${userId}&token=${token}`;
  };

  useEffect(() => {
    if (!token || !userId) return;

    const ws = new WebSocket(getWebSocketUrl());
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WebSocket Connected");
      setIsConnected(true);
      setConnectionStatus("Connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "new_message") {
          dispatch(addMessage(data));
        } else if (data.type === "active_status") {
          dispatch(setActiveUser(data.users));
        }
      } catch (err) {
        console.error("❌ Failed to parse WebSocket message:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
    };

    ws.onclose = () => {
      console.log("❌ WebSocket Disconnected");
      setIsConnected(false);
      setConnectionStatus("Disconnected");
      socketRef.current = null;
    };

    return () => {
      ws.close();
      socketRef.current = null;
    };
  }, [token, userId, dispatch]);

  const createMessage = (type, payload, recipientId, senderId) => ({
    type,
    recipientId,
    content: payload,
    senderId,
  });

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.error("⚠️ WebSocket is not connected.");
    }
  };

  return (
    <WebsocketContext.Provider
      value={{
        isConnected,
        connectionStatus,
        createMessage,
        sendMessage,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocket = () => useContext(WebsocketContext);

export default WebsocketProvider;
