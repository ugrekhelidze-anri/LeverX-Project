"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const userId =
      localStorage.getItem("userId") || sessionStorage.getItem("userId");

    if (userId) {
      router.replace("/");
    }
  }, [router]);

  return <>{children}</>;
}
