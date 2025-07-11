import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, setSelectedUser } from "../../Redux/slices/userSlice";
import { fetchMessages } from "../../Redux/slices/messageSlice";
const Sidebar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { users, loading } = useSelector((state) => state.user);
  const activeUsers = useSelector((state) => state.user.activeUsers);

  // Filter chats based on search query
  const filteredChats = users?.filter((chat) =>
    chat.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatClick = (selecteduser) => {
    dispatch(fetchMessages(selecteduser.id));
    dispatch(setSelectedUser(selecteduser));
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="flex flex-col h-full w-full bg-[#FCFCFA] shadow-sm">
      {/* Search Bar */}
      <div className="p-3 h-[64px] shadow-sm">
        <div className="relative">
          <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Chat List */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-full">
          <div className="w-8 h-8 border-[1.5px] border-t-[3px] border-blue-500  rounded-full animate-spin"></div>
          <p className="text-blue-300">Fetching users...</p>
        </div>
      ) : (
        <div className="overflow-y-auto mb-2 p-2 hide-scrollbar">
          <div className="space-y-1">
            {filteredChats.length === 0 ? (
              <div className="px-4 py-3 text-center text-gray-500">
                No users found
              </div>
            ) : (
              filteredChats.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleChatClick(user)}
                  className="px-4 py-3 flex items-center gap-3 shadow-sm hover:bg-gray-200 rounded-[8px] cursor-pointer transition-colors"
                >
                  {/* <FaUserCircle className="w-8 h-8 text-gray-400" /> */}
                  {user.imageUrl ? (
                    <div className="relative">
                      <img
                        src={user.imageUrl}
                        alt="User"
                        className="w-8 h-8 rounded-full"
                      />
                      {activeUsers.includes(user.id) && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                      )}
                    </div>
                  ) : (
                    <FaUser className="w-6 h-6 text-gray-400" />
                  )}
                  <div>
                    <h5 className="font-medium text-gray-900">
                      {user.fullName}
                    </h5>
                    {/* <p className="text-sm text-gray-500 truncate">
                    {chat?.lastMessage}
                  </p> */}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
