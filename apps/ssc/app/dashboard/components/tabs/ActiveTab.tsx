"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { HiCash, HiIdentification, HiUser, HiUserGroup } from "react-icons/hi";

const tabIcons = {
  ["/dashboard"]: HiUser,
  ["/dashboard/teams"]: HiUserGroup,
  ["/dashboard/certificates"]: HiIdentification,
  ["/dashboard/payments"]: HiCash,
};

interface Props {
  href: string;
  children: ReactNode;
}

const ActiveTab = ({ href, children }: Props) => {
  const path = usePathname();
  const TabIcon = tabIcons[href];

  return (
    <div
      className={clsx("p-px w-full rounded-3xl overflow-hidden", {
        "bg-gradient": path === href,
      })}
    >
      <div className="bg-(--background) rounded-3xl">
        <Link
          href={href}
          className={clsx("flex items-center h-full p-2.5 gap-2.5 text-2xl", {
            ["text-gradient"]: path === href,
          })}
        >
          <TabIcon />
          <p>{children}</p>
        </Link>
      </div>
    </div>
  );
};

export default ActiveTab;
