"use client";

import { Button, ButtonSize } from "@ssc/ui";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  "use client";
  return (
    <Button
      size={ButtonSize.SMALL}
      className="bg-red-700 text-[12px] font-bold"
      label="خروج از حساب کاربری"
      onClick={() => signOut()}
    />
  );
};
