import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../Redux/slices/messageSlice";
import { useUser } from "@clerk/clerk-react";
import { useWebsocket } from "../../Base/WebsocketProvider";
const ChatBox = () => {
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { sendMessage, createMessage } = useWebsocket();
  const selectedUser = useSelector((state) => state.user.selectedUser);

  const handleSendMessage = () => {
    if (message.trim() && selectedUser?.id) {
      dispatch(
        addMessage({
          content: message.trim(),
          recipientId: selectedUser.id,
          senderId: user.id,
          timestamp: new Date().toISOString(),
        })
      );
      const msg = createMessage(
        "new_message",
        message.trim(),
        selectedUser.id,
        user.id
      );
      sendMessage(msg);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-[1px] border-[#D1D1D1] w-full h-auto flex items-center p-2 rounded-lg shadow-sm bg-white">
      <TextareaAutosize
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={
          !selectedUser ? "Select a user to chat" : "Type your message..."
        }
        className={`flex-1 outline-none bg-transparent resize-none overflow-y-auto pr-3 ${
          !selectedUser ? "cursor-not-allowed" : ""
        }`}
        maxRows={4}
        minRows={1}
        disabled={!selectedUser}
        style={{ scrollbarWidth: "none" }}
      />
      <button
        onClick={handleSendMessage}
        className={`ml-2 p-3 flex cursor-pointer text-blue-500 hover:text-blue-600 transition-colors self-end rounded-full bg-blue-50 hover:bg-blue-200 active:scale-90 opacity-50
        ${!selectedUser ? "cursor-not-allowed" : ""}`}
        disabled={!selectedUser || message.trim().length === 0}
        title="Send message"
      >
        <IoSend size={20} className="pl-1" />
      </button>
    </div>
  );
};

export default ChatBox;
