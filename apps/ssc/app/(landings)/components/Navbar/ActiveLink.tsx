"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

const ActiveLink = ({ href, children }: Props) => {
  const path = usePathname();

  return (
    <div className="relative pb-px">
      <Link href={href} className={clsx({ ["text-gradient"]: path === href })}>
        {children}
      </Link>
      {path === href && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient"></div>
      )}
    </div>
  );
};

export default ActiveLink;
