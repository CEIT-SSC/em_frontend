"use client";

import { BASE_URL } from "@ssc/core";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, Suspense } from "react";

const RedirectingContent = () => {
  const session = useSession();
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handshake_token =
      params.get("handshake_token") ?? session.data.handshakeToken;
    if (session.status === "authenticated" && handshake_token) {
      const url = new URL(`${BASE_URL}/api/o/authorize`);
      params?.forEach((value, key) => {
        url.searchParams.set(key, value);
      });
      url.searchParams.set("handshake_token", handshake_token);
      window.location.href = url.toString();
    } else {
      router.push("/login");
    }
  }, [session, params, router]);

  return (
    <div className="w-full flex items-center justify-center gap-4 h-[50vh]">
      <div className="text-center text-4xl font-bold">در حال انتقال ...</div>
    </div>
  );
};

const Redirecting = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full flex items-center justify-center gap-4 h-[50vh]">
          <div className="text-center text-4xl font-bold">
            در حال بارگذاری ...
          </div>
        </div>
      }
    >
      <RedirectingContent />
    </Suspense>
  );
};

export default Redirecting;
