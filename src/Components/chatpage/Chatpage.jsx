import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import { FaComments } from "react-icons/fa";

const Chatpage = () => {
  const { messages, loading } = useSelector((state) => state.message);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 px-4">
        <FaComments className="text-6xl text-blue-400 mb-4 animate-bounce" />
        <h2 className="text-xl font-semibold text-center">
          No Conversation Selected
        </h2>
        <p className="text-sm text-center text-gray-400 mt-2 max-w-sm">
          Choose a user from your contacts or start a new conversation to begin
          chatting.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full mt-2 px-2">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <p>Loading Messages...</p>
        </div>
      ) : (
        <>
          <Message messages={messages} />
          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
};

export default Chatpage;
