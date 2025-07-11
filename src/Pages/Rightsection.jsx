import React from "react";
import { FaComments, FaRocket } from "react-icons/fa";

const Rightsection = () => {
  return (
    <div className="right w-full md:w-1/2 h-full rounded-t-[20px] md:rounded-l-[30px] bg-gradient-to-tr from-blue-100 via-purple-200 to-pink-100 flex flex-col justify-center items-center text-gray-800 p-10">
      <FaComments size={60} className="mb-5 text-purple-600" />
      <h2 className="text-3xl font-bold mb-3 text-center">
        Welcome to ChatZone!
      </h2>
      <p className="text-base max-w-md text-center mb-6 text-gray-700">
        Connect, chat, and collaborate with your team instantly. Secure, fast,
        and easy to use — wherever you are.
      </p>
      <div className="flex items-center gap-2 bg-white bg-opacity-70 rounded-full px-4 py-2 shadow-md cursor-pointer hover:bg-opacity-90 transition">
        <FaRocket className="text-blue-500" size={20} />
        <span className="font-medium text-sm text-blue-700">
          Get Started Quickly
        </span>
      </div>
    </div>
  );
};

export default Rightsection;
