import { IUser } from "../../types/User";
import { useHeaderPaths } from "../../hooks/useHeaderPaths";
import "./MobileMenu.scss";
import "./MobileMenu.responsive.scss";

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
      <aside className={`mobile-menu ${mobileOpen ? "mobile-menu--open" : ""}`}>
        <button type="button" className="mobile-menu__close" onClick={onClose}>
          <img
            src="/assets/x.png"
            alt="close"
            className="mobile-menu__close-icon"
          />
        </button>
        <div className="mobile-menu__header">
          <img
            src={currentUser?.user_avatar || "/assets/pfp.png"}
            alt="profile"
            className="mobile-menu__avatar"
            onClick={() => {
              onClose();
              goProfile();
            }}
          />
          <div className="mobile-menu__user-info">
            <h2
              className="mobile-menu__name"
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
              className="mobile-menu__signout"
              onClick={onSignOut}
            >
              Sign out
            </button>
          </div>
        </div>
        <nav className="mobile-menu__nav">
          <button
            type="button"
            className="mobile-menu__link mobile-menu__link--address"
            onClick={() => {
              onClose();
              goHome();
            }}
          >
            Address Book
          </button>
          <button
            type="button"
            className="mobile-menu__link mobile-menu__link--leave"
          >
            Leave Requests
          </button>
          <button
            type="button"
            className="mobile-menu__link mobile-menu__link--settings"
            onClick={() => {
              onClose();
              goPermissions();
            }}
          >
            Settings
          </button>
        </nav>
        <button type="button" className="mobile-menu__support">
          <span className="mobile-menu__support-icon">?</span>
          <span className="mobile-menu__support-label">SUPPORT</span>
        </button>
      </aside>
      <div
        className={`mobile-menu__backdrop ${
          mobileOpen ? "mobile-menu__backdrop--visible" : ""
        }`}
        onClick={onClose}
      />
    </>
  );
};
