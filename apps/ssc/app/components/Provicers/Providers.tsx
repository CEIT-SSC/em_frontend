"use client";

import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./AuthProvider";
import { Provider } from "react-redux";
import { store } from "../../../core/store/store";

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
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </ProgressProvider>
      </AuthProvider>
    </Provider>
  );
};

export default Providers;
