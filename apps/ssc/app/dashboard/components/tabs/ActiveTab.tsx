"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useMemo } from "react";
import { IconType } from "react-icons";
import { HiCash, HiIdentification, HiUser, HiUserGroup } from "react-icons/hi";
import { LuPickaxe } from "react-icons/lu";
import { MdCoPresent } from "react-icons/md";

const tabIcons: { [key: string]: IconType } = {
  ["/dashboard/info"]: HiUser,
  ["/dashboard/teams"]: HiUserGroup,
  ["/dashboard/certificates"]: HiIdentification,
  ["/dashboard/payments"]: HiCash,
  ["/dashboard/soon"]: LuPickaxe,
  ["/dashboard/classes"]: MdCoPresent,
};

interface Props {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}

const ActiveTab = ({ href, children, onClick }: Props) => {
  const path = usePathname();
  const TabIcon = tabIcons[href];
  const isActive = useMemo(() => path.includes(href), [path, href]);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={clsx("flex min-h-12 items-center gap-3 rounded-lg border px-3 py-2 text-sm font-medium transition-colors", isActive ? "border-border bg-surface-raised text-accent" : "border-transparent text-muted hover:bg-surface-raised hover:text-foreground")}
    >
      <TabIcon size={20} aria-hidden="true" />
      <span>{children}</span>
    </Link>
  );
};

export default ActiveTab;
