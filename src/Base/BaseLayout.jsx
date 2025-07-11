import React from "react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

const BaseLayout = ({ children }) => {
  const { isSignedIn } = useUser();

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      {isSignedIn && (
        <header className="bg-gray-700 text-white py-[6px] px-[12px] md:p-[12px] flex items-center justify-between">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-md md:text-2xl font-bold">
              Abhishek's Chat APP
            </h1>
            <div>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </header>
      )}

      {/* Main Content fills the remaining height */}
      <main className="flex-1 overflow-auto bg-gray-100">
        <div className="mx-auto  h-full">{children}</div>
      </main>
    </div>
  );
};

export default BaseLayout;
