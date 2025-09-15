"use client";

import React, {useEffect, useState} from "react";
import {HiMenu, HiX} from "react-icons/hi";
import clsx from "clsx";
import AuthData from "./AuthData";
import ActiveLink from "./ActiveLink";
import {navbarItems} from "./Navbar";
import {usePathname} from "next/navigation";

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname();

    useEffect(() => {
        setIsOpen(false);
    }, [path]);

    const menuLayout = clsx(
        "fixed top-0 left-0 w-[100vw] h-[100vh] bg-(--MainGray)",
        "z-99 flex flex-col *:h-full",
        "transition-opacity !transition-500",
        {
            "opacity-100 pointer-events-auto": isOpen,
            "opacity-0 pointer-events-none": !isOpen,
        }
    );

    return (
        <>
            <button
                className="cursor-pointer p-4 md:hidden"
                onClick={() => setIsOpen(true)}
            >
                <HiMenu size={24}/>
            </button>
            <div className={menuLayout}>
                <div className="p-6">
                    <button
                        className="cursor-pointer p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <HiX size={24}/>
                    </button>
                </div>
                <div className="flex flex-col gap-4 py-8 justify-center items-center text-2xl">
                    {navbarItems.map((item) => (
                        <ActiveLink href={item.href} key={item.label}>
                            {item.label}
                        </ActiveLink>
                    ))}
                </div>
                <div className="flex justify-center items-center mb-8">
                    <AuthData/>
                </div>
            </div>
        </>
    );
};

export default HamburgerMenu;
