import React from "react";
import "./index.css";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import WebsocketProvider from "./Base/WebsocketProvider";
import { createRoot } from "react-dom/client";

// Replace with your Clerk publishable key
const PUBLISHABLE_KEY =
  "pk_test_ZW5nYWdpbmctc3BhbmllbC03Ny5jbGVyay5hY2NvdW50cy5kZXYk";

// 🎨 **Custom UI Appearance**
const appearance = {
  variables: {
    colorPrimary: "#172554",
    colorBackground: "#F3F4F6",
    colorInputBackground: "#FFFFFF",
    colorText: "#1F2937",
    borderRadius: "8px",
  },
  elements: {
    cardBox: {
      boxShadow: "none",
      height: "100%",
    },
    headerTitle: {
      fontSize: "20px",
      fontWeight: "700",
    },
    userButtonPopoverFooter: {
      display: "none",
    },
    userButtonAvatarBox: {
      width: "30px",
      height: "30px",
    },
  },
};

const localization = {
  signUp: {
    start: {
      title: "Create your account",
      subtitle: "to continue to {{applicationName}}",
      button: "Log in",
      formButtonPrimary: "Verify",
    },
  },
  signIn: {
    start: {
      title: "Sign-In your account",
      subtitle: "continue to {{applicationName}}",
    },
  },
};

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      localization={localization}
      appearance={appearance}
      afterSignOutUrl="/"
    >
      <WebsocketProvider url="ws://localhost:8080/ws">
        <App />
      </WebsocketProvider>
    </ClerkProvider>
  </Provider>
);
