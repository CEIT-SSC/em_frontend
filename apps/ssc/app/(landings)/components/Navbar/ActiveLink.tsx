"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function ActiveLink({ href, children }: { href: string; children: ReactNode }) {
  const path = usePathname();
  const isActive = !href.includes("#") && path === href;
  return <Link href={href} className="ssc-nav-link" aria-current={isActive ? "page" : undefined}>{children}</Link>;
}
