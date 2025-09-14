"use client";

import { AppProgressProvider } from "@bprogress/next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProgressProvider
      height="4px"
      color="white"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="custom-toast-container"
        closeButton={false}
        style={{
          fontFamily: "var(--font-estedad), var(--font-vazirmatn), sans-serif",
        }}
      />
    </AppProgressProvider>
  );
};

export default Providers;
