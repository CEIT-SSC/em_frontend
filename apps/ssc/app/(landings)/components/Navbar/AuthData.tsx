"use client";

import {Button, ButtonSize, ButtonVariant} from "@ssc/ui";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useEffect} from "react";
import {userSelector} from "~/core/store/Auth/user.selector";
import {fetchUserData} from "~/core/store/Auth/user.thunk";
import {useAppDispatch, useAppSelector} from "~/core/store/store";
import {AiOutlineLoading} from "react-icons/ai";

const AuthData = () => {
    const dispatch = useAppDispatch();
    const session = useSession();
    const userData = useAppSelector(userSelector);

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
            <>
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
            </>
        );
    } else {
        if (!userData.loggedIn || session.status === "loading") {
            return <AiOutlineLoading className="animate-spin"/>;
        }
        return (
            <>
                <p>{userData.first_name + " " + userData.last_name}</p>
                <Button
                    className="min-h-9 min-w-16 bg-red-700"
                    size={ButtonSize.SMALL}
                    label="خروج از حساب"
                    onClick={handleLogout}
                />
            </>
        );
    }
};

export default AuthData;
