import React from "react";
import { FaAngleLeft, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { setSelectedUser } from "../../Redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
const ChatNav = () => {
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const dispatch = useDispatch();

  const activeUsers = useSelector((state) => state.user.activeUsers);
  const isActive = activeUsers?.some((id) => id === selectedUser?.id);

  return (
    <div className="w-full h-16 text-white bg-[#FCFCFA] p-[12px] flex items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => dispatch(setSelectedUser(null))}
        >
          <FaAngleLeft />
        </button>
        <span className="text-gray-700">
          {selectedUser?.imageUrl ? (
            <img
              src={selectedUser?.imageUrl}
              alt="user"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <FaUser className="text-gray-700 w-8 h-8 border-[1.5px]  border-gray-900  rounded-full p-[2px]" />
          )}
        </span>
        <div className="flex flex-col justify-center pt-1">
          <p className="text-black text-[12px] font-bold">
            {selectedUser?.fullName || "Select a user"}
          </p>
          {isActive ? (
            <p className="text-green-900 font-bold text-[10px]">Online</p>
          ) : (
            <p
              className={`text-red-900 font-bold text-[10px] ${
                !selectedUser && "hidden"
              }`}
            >
              Offline
            </p>
          )}
        </div>
      </div>
      <BsThreeDotsVertical className="text-gray-700 cursor-pointer" />
    </div>
  );
};

export default ChatNav;
