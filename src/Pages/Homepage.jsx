import React from "react";
import ChatBox from "../Components/chatpage/ChatBox";
import Sidebar from "../Components/chatpage/Sidebar";
import ChatNav from "../Components/chatpage/ChatNav";
import Chatpage from "../Components/chatpage/Chatpage";
import { useSelector } from "react-redux";

const Homepage = () => {
  const selectedUser = useSelector((state) => state.user.selectedUser);
  return (
    <div className="w-full h-full flex  items-center justify-center">
      <div
        className={`left-side-bar h-full w-[400px] ${
          selectedUser ? "hidden md:block" : "block"
        }`}
      >
        <Sidebar />
      </div>
      <div
        className={`right w-full flex flex-col h-full md:border-l-2 border-gray-700 ${
          selectedUser ? "block" : "hidden md:flex"
        }`}
      >
        <div className="w-full">
          <ChatNav />
        </div>

        <div className="w-full flex-1 overflow-auto">
          <Chatpage />
        </div>

        <div className="w-full p-4 bg-[#FCFCFA]">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
