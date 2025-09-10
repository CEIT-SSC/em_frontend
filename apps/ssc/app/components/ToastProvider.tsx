"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiCheck, HiX } from "react-icons/hi";

export function ToastProvider() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={4000}
      hideProgressBar={true}
      closeButton={false}
      newestOnTop={false}
      closeOnClick
      rtl={true}
      draggable
      pauseOnFocusLoss
      pauseOnHover
      style={{
        marginBottom: "2rem",
        gap: "1rem",
      }}
      toastStyle={{
        borderRadius: "999px",
        background: "#1B1B1B",
        width: "fit-content",
        padding: "8px",
        display: "flex",
        gap: "42px",
      }}
      icon={({ type }) => {
        switch (type) {
          case "error":
            return (
              <HiX
                className="overflow-visible bg-gradient rounded-full text-[#1B1B1B]"
                size={64}
              />
            );
          case "success":
            return (
              <HiCheck
                className="overflow-visible bg-gradient rounded-full text-[#1B1B1B]"
                size={64}
              />
            );
          default:
            return null;
        }
      }}
    />
  );
}
