import { useHeaderPaths } from "../../hooks/useHeaderPaths";
import { IUser } from "../../types/User";
import "./Header.scss";
import "./Header.responsive.scss";

type HeaderProps = {
  currentUser: IUser | null;
  onMenuToggle: () => void;
  onSignOut: () => void;
  mobileOpen: boolean;
  whichTabIsOpen: "settings" | "address"; // can only be settings or address for now
};

export const Header = ({
  currentUser, // current user from context
  onMenuToggle, // toggle mobile menu
  onSignOut, // sign out callback
  mobileOpen, // mobile menu state
  whichTabIsOpen, // active tab
}: HeaderProps) => {
  // every redirection from hook
  const { goHome, goProfile, goPermissions } = useHeaderPaths();

  // check if user is an admin
  const isAdmin = currentUser?.role === "admin";

  return (
    <header className="app-header">
      <div className="app-header__brand" role="button" onClick={goHome}>
        <p className="app-header__brand-label">LeverX</p>
        <h1 className="app-header__brand-title">EMPLOYEE SERVICES</h1>
      </div>
      <button
        type="button"
        className={`app-header__menu-toggle ${
          mobileOpen ? "app-header__menu-toggle--open" : ""
        }`}
        onClick={onMenuToggle}
      >
        <img
          src="/assets/menu.png"
          alt="open menu"
          className="app-header__menu-icon app-header__menu-icon--open"
        />
        <img
          src="/assets/x.png"
          alt="close menu"
          className="app-header__menu-icon app-header__menu-icon--close"
        />
      </button>
      <div className="app-header__nav">
        <div
          className={`app-header__address ${
            // if address is open underline address
            whichTabIsOpen === "address" ? "app-header__address--active" : ""
          }`}
          onClick={goHome}
        >
          <h1>Address Book</h1>
        </div>
        {isAdmin && (
          <div className="app-header__address leave">
            <h1>Leave Requests</h1>
          </div>
        )}
        {isAdmin && (
          <div
            className={`  app-header__address settings ${
              // if settings tab is open underline settings
              whichTabIsOpen === "settings" ? "app-header__address--active" : ""
            }`}
            onClick={goPermissions}
          >
            <h1>Settings</h1>
          </div>
        )}
      </div>
      <button type="button" className="app-header__support">
        <span className="app-header__support-icon">?</span>
        <span className="app-header__support-label">SUPPORT</span>
      </button>
      <div className="app-header__profile" role="button">
        <img
          src={currentUser?.user_avatar || "/assets/pfp.png"}
          alt="pfp"
          className="app-header__profile-image"
        />
        <h1 className="app-header__profile-name" onClick={goProfile}>
          {currentUser
            ? `${currentUser.first_name} ${currentUser.last_name}`
            : "STEVE COOK"}
        </h1>
      </div>
      <button type="button" className="app-header__exit" onClick={onSignOut}>
        <img
          src="/assets/shutdown.png"
          alt="exiticon"
          className="app-header__exit-icon"
        />
      </button>
    </header>
  );
};
