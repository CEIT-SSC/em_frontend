"use client";

import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import "react-toastify/dist/ReactToastify.css";
import { ToastProvider } from "./ToastProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="4px"
      options={{ showSpinner: true }}
      shallowRouting
    >
      {children}
      <ToastProvider />
    </ProgressProvider>
  );
};

export default Providers;
