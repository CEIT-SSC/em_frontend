"use client";

import { useRouter } from "@bprogress/next";
import { useRouter as nextIntlRouter } from "../../../lib/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const session = useSession();
  const router = useRouter({ customRouter: nextIntlRouter });

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
      // TODO: show toast
    } else {
      router.push("/");
    }
  }, [session]);

  return <div>لطفا صبر کنید | please wait</div>;
}
