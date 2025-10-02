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
    <div
      className={clsx("p-px w-full rounded-3xl overflow-hidden", {
        "bg-gradient": isActive,
      })}
    >
      <div className="bg-(--background) rounded-3xl">
        <Link
          href={href}
          onClick={onClick}
          className={clsx("flex items-center h-full p-2.5 gap-2.5 text-2xl", {
            ["text-gradient"]: isActive,
          })}
        >
          <GradientSvg />
          <TabIcon
            style={{
              fill: isActive ? `url(#blue-gradient)` : "",
              stroke: isActive ? `url(#blue-gradient)` : "",
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
