"use client";

import { useRouter } from "next/navigation";
import { useUserContext } from "./useUserContext";

export function useHeaderPaths() {
  const router = useRouter();
  const { user } = useUserContext(); // get current logged in user from rtk

  const goHome = () => {
    router.push("/"); // redirect to Index
  };

  const goProfile = () => {
    // redirect to logged in user profile
    if (!user?._id) return;
    router.push(`/users/${user._id}`);
  };

  const goPermissions = () => {
    router.push("/permissions"); // redirect to permissions
  };

  return {
    goHome,
    goProfile,
    goPermissions,
  };
}

