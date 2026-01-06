"use client";

import Image from "next/image";
import { IUser } from "../../types/User";
import { useHeaderPaths } from "../../hooks/useHeaderPaths";
import styles from "./MobileMenu.module.scss";

type MobileMenuProps = {
  currentUser: IUser | null;
  mobileOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
};

export const MobileMenu = ({
  currentUser, // current user
  mobileOpen, // mobile menu state
  onClose, // on close callback
  onSignOut, // on sign out callback
}: MobileMenuProps) => {
  // every redirection from hook
  const { goHome, goProfile, goPermissions } = useHeaderPaths();

  return (
    <>
      <aside className={`${styles["mobile-menu"]} ${mobileOpen ? styles["mobile-menu--open"] : ""}`}>
        <button type="button" className={styles["mobile-menu__close"]} onClick={onClose}>
          <Image
            src="/assets/x.png"
            alt="close"
            className={styles["mobile-menu__close-icon"]}
            width={24}
            height={24}
          />
        </button>
        <div className={styles["mobile-menu__header"]}>
          <Image
            src={currentUser?.user_avatar || "/assets/pfp.png"}
            alt="profile"
            className={styles["mobile-menu__avatar"]}
            width={64}
            height={64}
            onClick={() => {
              onClose();
              goProfile();
            }}
          />
          <div className={styles["mobile-menu__user-info"]}>
            <h2
              className={styles["mobile-menu__name"]}
              onClick={() => {
                onClose();
                goProfile();
              }}
            >
              {currentUser
                ? `${currentUser.first_name} ${currentUser.last_name}`
                : "Steve Cook"}
            </h2>
            <button
              type="button"
              className={styles["mobile-menu__signout"]}
              onClick={onSignOut}
            >
              Sign out
            </button>
          </div>
        </div>
        <nav className={styles["mobile-menu__nav"]}>
          <button
            type="button"
            className={`${styles["mobile-menu__link"]} ${styles["mobile-menu__link--address"]}`}
            onClick={() => {
              onClose();
              goHome();
            }}
          >
            Address Book
          </button>
          <button
            type="button"
            className={`${styles["mobile-menu__link"]} ${styles["mobile-menu__link--leave"]}`}
          >
            Leave Requests
          </button>
          <button
            type="button"
            className={`${styles["mobile-menu__link"]} ${styles["mobile-menu__link--settings"]}`}
            onClick={() => {
              onClose();
              goPermissions();
            }}
          >
            Settings
          </button>
        </nav>
        <button type="button" className={styles["mobile-menu__support"]}>
          <span className={styles["mobile-menu__support-icon"]}>?</span>
          <span className={styles["mobile-menu__support-label"]}>SUPPORT</span>
        </button>
      </aside>
      <div
        className={`${styles["mobile-menu__backdrop"]} ${
          mobileOpen ? styles["mobile-menu__backdrop--visible"] : ""
        }`}
        onClick={onClose}
      />
    </>
  );
};

