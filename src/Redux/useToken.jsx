import React from "react";
import { useAuth } from "@clerk/clerk-react";
const useToken = () => {
  const { getToken } = useAuth();
  const token = getToken();
  console.log(token);
  return token;
};

export default useToken;
