import React, { useEffect, useRef } from "react";
import { SignUp, useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";
import { appearanceAuthForm } from "../Base/Helper";
import { setToken } from "../Redux/slices/userSlice";
import { useDispatch } from "react-redux";
import Rightsection from "./Rightsection";

const Signup = ({ setAuthOption }) => {
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
            className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"
            style={{ animationDuration: "2s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex  flex-col md:flex-row h-screen bg-white">
      {/* Left side: Signup form */}
      <div className="left w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <SignUp appearance={appearanceAuthForm} />
        <p className="text-xs mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-700 font-semibold underline hover:text-blue-900"
          >
            Sign In
          </Link>
        </p>
      </div>

      {/* Right side: Info / Marketing panel */}
      <Rightsection />
    </div>
  );
};

export default Signup;
