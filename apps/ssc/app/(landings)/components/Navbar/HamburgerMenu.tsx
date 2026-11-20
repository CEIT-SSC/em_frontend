"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import AuthData from "./AuthData";
import { navbarItems } from "./Navbar";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!isOpen) { dialog.current?.close(); return; }
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => { document.body.style.overflow = previous; desktop.removeEventListener("change", closeOnDesktop); };
  }, [isOpen]);
  return (
    <>
      <button type="button" className="ssc-action ssc-action-secondary lg:hidden" aria-label="باز کردن منو" aria-expanded={isOpen} aria-controls="ssc-mobile-menu" onClick={() => setIsOpen(true)}><HiMenu size={22} aria-hidden="true" /></button>
      <dialog ref={dialog} id="ssc-mobile-menu" aria-label="منوی اصلی" onClose={() => setIsOpen(false)} onClick={event => { if (event.target === event.currentTarget) setIsOpen(false); }} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-background p-6 text-foreground backdrop:bg-black/60">
        <div className="flex items-center justify-between border-b border-border pb-5"><span className="font-semibold">انجمن علمی مهندسی کامپیوتر</span><button type="button" className="ssc-action ssc-action-secondary" aria-label="بستن منو" onClick={() => setIsOpen(false)}><HiX size={22} aria-hidden="true" /></button></div>
        <nav aria-label="ناوبری موبایل" className="flex flex-col gap-2 py-8">{navbarItems.map(item => <Link key={item.href} href={item.href} className="ssc-nav-link py-3 text-xl" onClick={() => setIsOpen(false)}>{item.label}</Link>)}</nav>
        <div onClick={() => setIsOpen(false)} className="border-t border-border pt-6"><AuthData /></div>
      </dialog>
    </>
  );
}
