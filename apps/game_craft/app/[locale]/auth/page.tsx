"use client";

import { useRouter } from "@bprogress/next";
import { useRouter as nextIntlRouter } from "../../../lib/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Flex, Spin, Typography } from "antd";

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

  return (
    <main className="gc-public gc-public-world gc-auth-gate" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "1.5rem" }}>
      <Flex className="gc-surface gc-auth-panel" vertical align="center" gap="middle" style={{ padding: "3rem", textAlign: "center" }}>
        <Spin size="large" />
        <Typography.Title level={2} style={{ margin: 0 }}>Preparing your GameCraft space</Typography.Title>
        <Typography.Text type="secondary">لطفا صبر کنید</Typography.Text>
      </Flex>
    </main>
  );
}
