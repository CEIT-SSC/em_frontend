"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import { HiCash, HiIdentification, HiUser, HiUserGroup } from "react-icons/hi";
import { LuPickaxe } from "react-icons/lu";

const tabIcons: { [key: string]: IconType } = {
  ["/dashboard"]: HiUser,
  ["/dashboard/teams"]: HiUserGroup,
  ["/dashboard/certificates"]: HiIdentification,
  ["/dashboard/payments"]: HiCash,
  ["/dashboard/soon"]: LuPickaxe,
};

interface Props {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}

const ActiveTab = ({ href, children, onClick }: Props) => {
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
          onClick={onClick}
          className={clsx("flex items-center h-full p-2.5 gap-2.5 text-2xl", {
            ["text-gradient"]: path === href,
          })}
        >
          <GradientSvg />
          <TabIcon
            style={{
              fill: path === href ? `url(#blue-gradient)` : "",
              stroke: path === href ? `url(#blue-gradient)` : "",
            }}
          />
          <p>{children}</p>
        </Link>
      </div>
    </div>
  );
};

// to have icons gradient
const GradientSvg = () => {
  return (
    <svg width="0" height="0" aria-hidden>
      <linearGradient id="blue-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop stopColor="#ff715b" offset="-15%" />
        <stop stopColor="#cb48b7" offset="100%" />
      </linearGradient>
    </svg>
  );
};

export default ActiveTab;
