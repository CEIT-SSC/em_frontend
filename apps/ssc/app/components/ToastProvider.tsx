"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export function ToastProvider() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={true}
      closeButton={false}
      newestOnTop={false}
      closeOnClick
      draggable
      pauseOnHover
      toastStyle={{
        borderRadius: "999px",
        background: "#1B1B1B",
        width: "fit-content",
        padding: "8px",
        display: "flex",
        gap: "36px",
      }}
      icon={({ type }) => {
        switch (type) {
          case "error":
            return <HiXCircle className="overflow-visible" size={64} />;
          case "success":
            return <HiCheckCircle className="overflow-visible" size={64} />;
          default:
            return null;
        }
      }}
    />
  );
}
