"use client";

import { Header } from "@/components/Header/Header";
import { MobileMenu } from "@/components/MobileMenu/MobileMenu";
import { useUserContext } from "@/hooks/useUserContext";
import { toggleMobileMenu } from "@/utils/toggleMobileMenu";
import { signOut } from "@/utils/signOut";
import { getActiveTab } from "@/utils/getActiveTab";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserContext();
  const { mobileOpen, toggleMobile, closeMobile } = toggleMobileMenu();

  const [ready, setReady] = useState(false);

  // check for logged in user
  useEffect(() => {
    const isLoggedIn =
      sessionStorage.getItem("isLoggedIn") === "true" ||
      localStorage.getItem("isLoggedIn") === "true";

    const userId =
      sessionStorage.getItem("userId") || localStorage.getItem("userId");

    if (!isLoggedIn || !userId) {
      router.replace("/auth");
      return;
    }

    setReady(true);
  }, [router]);

  // prevent UI flash and  unauthorized render
  if (!ready) return null;

  return (
    <>
      <Header
        currentUser={user}
        mobileOpen={mobileOpen}
        onMenuToggle={toggleMobile}
        onSignOut={signOut}
        whichTabIsOpen={getActiveTab(pathname)}
      />

      <MobileMenu
        currentUser={user}
        mobileOpen={mobileOpen}
        onClose={closeMobile}
        onSignOut={signOut}
      />

      <main className="app-content">{children}</main>
    </>
  );
}
