"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    // check first session storage and then local storage to see if user is logged in
    const isLoggedIn =
      sessionStorage.getItem("isLoggedIn") === "true" ||
      localStorage.getItem("isLoggedIn") === "true";

    // get user id
    const userId =
      sessionStorage.getItem("userId") || localStorage.getItem("userId");

    // if user is not logged in redirect to auth page
    if (!isLoggedIn || !userId) {
      router.push("/auth");
    }
  }, [router]);

  // if everything goes well render the children
  return <>{children}</>;
}

