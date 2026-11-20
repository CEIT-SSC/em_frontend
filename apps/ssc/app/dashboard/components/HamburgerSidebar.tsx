"use client";

import { useEffect, useRef, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import Tabs from "./tabs/Tabs";
import { LogoutButton } from "./LogoutButton/LogoutButton";

interface HamburgerSidebarProps {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    image?: string | null;
  };
}

export default function HamburgerSidebar({ user }: HamburgerSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dialog = useRef<HTMLDialogElement>(null);
  const closeSidebar = () => setIsOpen(false);
  useEffect(() => {
    if (!isOpen) { dialog.current?.close(); return; }
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => { document.body.style.overflow = previous; desktop.removeEventListener("change", closeOnDesktop); };
  }, [isOpen]);
  return (
    <>
      <button type="button" className="ssc-action ssc-action-secondary fixed right-5 top-5 z-40 md:hidden" aria-label="باز کردن منوی داشبورد" aria-expanded={isOpen} aria-controls="ssc-dashboard-menu" onClick={() => setIsOpen(true)}><HiMenu size={22} aria-hidden="true" /></button>
      <aside aria-label="ناوبری داشبورد" className="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col border-e border-border bg-surface px-5 py-7 md:flex">
        <SidebarContent user={user} onLinkClick={closeSidebar} />
      </aside>
      <dialog ref={dialog} id="ssc-dashboard-menu" aria-label="منوی داشبورد" onClose={closeSidebar} onClick={event => { if (event.target === event.currentTarget) closeSidebar(); }} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-background p-5 text-foreground backdrop:bg-black/60">
        <div className="mb-6 flex justify-end"><button type="button" className="ssc-action ssc-action-secondary" aria-label="بستن منوی داشبورد" onClick={closeSidebar}><HiX size={22} aria-hidden="true" /></button></div>
        <div className="flex min-h-[calc(100dvh-7rem)] flex-col"><SidebarContent user={user} onLinkClick={closeSidebar} /></div>
      </dialog>
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
          className="h-auto w-10"
        />
        <div className="text-xs leading-6 text-muted">
          <p>انجمن علمی</p>
          <p>مهندسی کامپیوتر</p>
          <p>دانشگاه پلی تکنیک تهران</p>
        </div>
      </Link>

      <div className="flex flex-1 flex-col items-center gap-7 py-8">
        <div className="flex flex-col gap-3 items-center">
          <Image
            width={128}
            height={128}
            src={user.image ?? "/default-profile.png"}
            alt="profile photo"
            className="h-20 w-20 rounded-full object-cover"
          />
          <h4 className="text-base font-semibold">{[user.firstName, user.lastName].filter(Boolean).join(" ")}</h4>
          {/*<EditAccountButton />*/}
        </div>
        <Tabs onTabClick={onLinkClick} />
      </div>

      <LogoutButton />
    </>
  );
}
