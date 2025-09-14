import { signOut, useSession } from "next-auth/react";
import { useMemo } from "react";

export const useAuth = () => {
  const session = useSession();

  const isLoading = useMemo(
    () => session.status === "loading",
    [session.status]
  );

  const isAuthenticated = useMemo(
    () => session.status === "authenticated",
    [session.status]
  );

  const logout = () => {
    signOut({ callbackUrl: "/" });
  };

  const user = useMemo(
    () => (session.status === "authenticated" ? session.data.user : undefined),
    [session]
  );

  return { isLoading, isAuthenticated, user, logout };
};
