import React from "react";
import { useSelector } from "react-redux";
const Message = ({ messages }) => {
  const selectedUser = useSelector((state) => state.user.selectedUser);

  const getFormattedTime = (time) => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert 24-hour time to 12-hour time
    hours = hours % 12;
    hours = hours ? hours : 12; // '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  return (
    <div className="flex flex-col space-y-4">
      {messages.map((message) => (
        <React.Fragment key={message?._id}>
          {message.senderId !== selectedUser?.id ? (
            <div className="flex flex-col items-end w-full">
              <div className="flex justify-end gap-2 w-[80%] md:w-[60%] ">
                <p className="text-sm px-3 py-[8px] rounded-lg bg-blue-200 text-gray-800 rounded-br-none text-left">
                  {message.content}
                </p>
              </div>
              <span className="text-[10px] text-gray-500 mt-1 px-1">
                {getFormattedTime(new Date(message.timestamp))}
              </span>
            </div>
          ) : (
            <div key={message.id} className="flex flex-col items-start w-full">
              <div className="flex items-end gap-2 w-[80%] md:w-[60%]">
                <p className="text-sm px-3 py-[8px] rounded-lg bg-gray-200 text-gray-800 rounded-bl-none text-left">
                  {message.content}
                </p>
              </div>
              <span className="text-[10px] text-gray-500 mt-1 px-1">
                {getFormattedTime(new Date(message.timestamp))}
              </span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Message;
