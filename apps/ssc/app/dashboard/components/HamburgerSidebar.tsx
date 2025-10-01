"use client";

import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import Tabs from "./tabs/Tabs";
import { LogoutButton } from "./LogoutButton/LogoutButton";
import EditAccountButton from "../edit-account/components/EditAccountButton";

interface HamburgerSidebarProps {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    image?: string | null;
  };
}

export default function HamburgerSidebar({ user }: HamburgerSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="md:hidden fixed top-4 right-4 z-50 bg-whiteText rounded-full shadow-lg p-1">
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
          size={20}
          color="#000"
          duration={0.3}
        />
      </div>

      {/* Desktop sidebar - always visible */}
      <div className="hidden md:flex w-full md:w-100 md:py-9 md:px-8 p-4 flex-col justify-between border-l border-(--TextWhite)/10 shadow-[0px_0px_8px_0px_rgba(199,199,199,0.06)]">
        <SidebarContent user={user} onLinkClick={closeSidebar} />
      </div>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`
        md:hidden fixed top-0 left-0 h-full w-80 bg-background z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        border-r-1 border-(--TextWhite)/10
        flex flex-col justify-between p-4
      `}
      >
        <SidebarContent user={user} onLinkClick={closeSidebar} />
      </div>
    </>
  );
}

interface SidebarContentProps {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    image?: string | null;
  };
  onLinkClick: () => void;
}

function SidebarContent({ user, onLinkClick }: SidebarContentProps) {
  return (
    <>
      <Link
        href="/"
        className="flex items-center justify-center gap-4"
        onClick={onLinkClick}
      >
        <Image
          width={50}
          height={60}
          src="/logo.png"
          alt="ssc logo"
          className="w-14 md:w-16 h-auto justify-items-center content-center"
        />
        <div className="text-sm text-center">
          <p>انجمن علمی</p>
          <p>مهندسی کامپیوتر</p>
          <p>دانشگاه پلی تکنیک تهران</p>
        </div>
      </Link>

      <div className="h-full py-8 flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-3 items-center">
          <Image
            width={128}
            height={128}
            src={user.image ?? "/default-profile.png"}
            alt="profile photo"
            className="w-32 h-32 rounded-full object-cover"
          />
          <h4 className="text-2xl/[150%] font-bold">{`${user.firstName} ${user.lastName}`}</h4>
          <EditAccountButton />
        </div>
        <Tabs onTabClick={onLinkClick} />
      </div>

      <LogoutButton />
    </>
  );
}
