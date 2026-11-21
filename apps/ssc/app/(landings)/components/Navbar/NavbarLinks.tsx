"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import ActiveLink from "./ActiveLink";

const publicItems = [
  { label: "خانه", href: "/" },
  { label: "رویدادها", href: "/#events" },
  { label: "تیم فنی", href: "/about" },
];

export default function NavbarLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { status } = useSession();
  const items = status === "authenticated"
    ? [...publicItems, { label: "داشبورد", href: "/dashboard" }]
    : publicItems;

  return items.map(item => onNavigate ? (
    <Link key={item.href} href={item.href} className="ssc-nav-link py-3 text-xl" onClick={onNavigate}>{item.label}</Link>
  ) : (
    <ActiveLink key={item.href} href={item.href}>{item.label}</ActiveLink>
  ));
}
