"use client";

import { AppProgressProvider } from "@bprogress/next";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProgressProvider
      height="4px"
      color="#1E1E1E"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </AppProgressProvider>
  );
};

export default Providers;
