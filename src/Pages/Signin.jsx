import React, { useEffect, useRef } from "react";
import { SignIn, useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { appearanceAuthForm } from "../Base/Helper";
import { Link } from "react-router-dom";
import { setToken } from "../Redux/slices/userSlice";
import { useDispatch } from "react-redux";
import Rightsection from "./Rightsection";

const Signin = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const hasNavigated = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeToken = async () => {
      if (isLoaded && isSignedIn && !hasNavigated.current) {
        try {
          const token = await getToken();
          dispatch(setToken(token));
          hasNavigated.current = true;
          navigate("/home", { replace: true });
        } catch (error) {
          console.error("Error getting token:", error);
        }
      }
    };
    initializeToken();
  }, [isLoaded, isSignedIn, navigate, getToken, dispatch]);

  if (!isLoaded) {
    return (
      <div className="w-full h-full">
        <div className="flex items-center justify-center min-h-screen">
          <div
            className="w-12 h-12 border-4  border-blue-500 border-dashed rounded-full animate-spin"
            style={{ animationDuration: "2s" }}
          ></div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex md:flex-row flex-col justify-center items-center md:h-full bg-white">
      <div className="left h-full flex justify-center items-center flex-col gap-[12px] w-1/2">
        <SignIn appearance={appearanceAuthForm} />
        <p className="text-xs mb-6">
          Dont have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-900 font-medium cursor-pointer underline"
          >
            Sign Up{" "}
          </Link>
        </p>
      </div>
      <Rightsection />
    </div>
  );
};

export default Signin;
