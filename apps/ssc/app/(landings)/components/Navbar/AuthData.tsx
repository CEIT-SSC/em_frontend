"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { userSelector } from "~/core/store/Auth/user.selector";
import { fetchUserData } from "~/core/store/Auth/user.thunk";
import { useAppDispatch, useAppSelector } from "~/core/store/store";
import { FaCircleUser } from "react-icons/fa6";

const AuthData = () => {
  const dispatch = useAppDispatch();
  const session = useSession();
  const userData = useAppSelector(userSelector);

  useEffect(() => {
    if (session.status === "authenticated") {
      dispatch(fetchUserData());
    }
  }, [dispatch, session.status]);

  if (session.status === "unauthenticated") {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login" className="ssc-action text-muted hover:text-foreground">ورود</Link>
        <Link href="/register" className="ssc-action ssc-action-primary">ثبت نام</Link>
      </div>
    );
  } else {
    if (!userData.loggedIn || session.status === "loading") {
      return <span className="h-11 w-36 animate-pulse rounded-lg bg-surface-raised" role="status" aria-label="در حال بارگذاری حساب کاربری" />;
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
