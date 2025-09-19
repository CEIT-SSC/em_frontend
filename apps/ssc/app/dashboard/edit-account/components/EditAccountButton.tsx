"use client";

import { Button, ButtonSize } from "@ssc/ui";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const EditAccountButton = () => {
  const path = usePathname();
  return (
    <Link href="/dashboard/edit-account">
      <Button
        size={ButtonSize.SMALL}
        className={clsx("rounded-full", {
          ["bg-gradient"]: path === "/dashboard/edit-account",
          ["border"]: path !== "/dashboard/edit-account",
        })}
        label="ویرایش حساب"
      />
    </Link>
  );
};

export default EditAccountButton;
