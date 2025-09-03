"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../toast.css";

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
        background: "#1f2937",
        color: "white",
      }}
    />
  );
}
