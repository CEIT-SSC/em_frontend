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
        borderRadius: "var(--radius-panel)",
        background: "var(--surface-raised)",
        width: "fit-content",
        padding: "12px 16px",
        display: "flex",
        gap: "12px",
        color: "var(--foreground)",
        fontFamily: "var(--font-vazirmatn), sans-serif",
      }}
      icon={({ type }) => {
        switch (type) {
          case "error":
            return (
              <HiX
                className="shrink-0 text-danger"
                aria-hidden="true"
                size={22}
              />
            );
          case "success":
            return (
              <HiCheck
                className="shrink-0 text-success"
                aria-hidden="true"
                size={22}
              />
            );
          default:
            return null;
        }
      }}
    />
  );
}
