"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, Suspense } from "react";

const RedirectingContent = () => {
  const session = useSession();
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      window.location.replace(
        `/api/auth/authorize-refresh?${params.toString()}`
      );
    } else if (session.status === "unauthenticated") {
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
