"use client";

import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import AuthProvider from "./AuthProvider";
import { Provider } from "react-redux";
import { store } from "../../../core/store/store";
import { ToastProvider } from "../ToastProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ProgressProvider
          height="4px"
          options={{ showSpinner: true }}
          shallowRouting
        >
          {children}
          <ToastProvider />
        </ProgressProvider>
      </AuthProvider>
    </Provider>
  );
};

export default Providers;
