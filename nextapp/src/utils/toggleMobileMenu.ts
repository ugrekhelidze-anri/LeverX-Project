import { useState } from "react";

export const toggleMobileMenu = (isVisible = false) => {
  const [mobileOpen, setMobileOpen] = useState(isVisible); // manage state

  const toggleMobile = () => {
    setMobileOpen((prev) => !prev); // toggle
  };

  const openMobile = () => setMobileOpen(true); // open mobile menu
  const closeMobile = () => setMobileOpen(false); // close mobile menu

  return { mobileOpen, toggleMobile, openMobile, closeMobile };
};
