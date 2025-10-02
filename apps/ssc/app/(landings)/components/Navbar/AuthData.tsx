"use client";

import { Button, ButtonSize, ButtonVariant } from "@ssc/ui";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { userSelector } from "~/core/store/Auth/user.selector";
import { fetchUserData } from "~/core/store/Auth/user.thunk";
import { useAppDispatch, useAppSelector } from "~/core/store/store";
import { AiOutlineLoading } from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";

const AuthData = () => {
  const dispatch = useAppDispatch();
  const session = useSession();
  const userData = useAppSelector(userSelector);
  const [logoutVisible, setLogoutVisible] = useState(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      dispatch(fetchUserData());
    }
  }, [dispatch, session]);

  const handleLogout = () => {
    signOut();
  };

  if (session.status === "unauthenticated") {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button
            className="min-h-9 min-w-16"
            variant={ButtonVariant.TEXT}
            size={ButtonSize.SMALL}
            label="ورود"
          />
        </Link>
        <Link href="/register">
          <Button
            className="min-h-9 min-w-16"
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.SMALL}
            label="ثبت نام"
          />
        </Link>
      </div>
    );
  } else {
    if (!userData.loggedIn || session.status === "loading") {
      return <AiOutlineLoading className="animate-spin" />;
    }
    return (
      <Link
        href={"/dashboard/info"}
        className="flex flex-row-reverse items-center gap-2 cursor-pointer"
      >
        <p>{userData.first_name + " " + userData.last_name}</p>
        <FaCircleUser size={24} />
      </Link>
    );
  }
};

export default AuthData;
