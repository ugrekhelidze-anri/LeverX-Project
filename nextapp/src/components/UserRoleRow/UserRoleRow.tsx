"use client";

import { IUser } from "../../types/User";
import styles from "./UserRoleRow.module.scss";

type UserRoleRowProps = {
  user: IUser;
  isSelf: boolean;
  isUpdating: boolean;
  onUpdate: (role: "employee" | "hr" | "admin") => void;
};

export const UserRoleRow = ({
  user, // user they're trying to update
  isSelf, // check if current user is trying to update himself
  isUpdating, // loading state
  onUpdate, // update user role
}: UserRoleRowProps) => {
  const isEmployee = user.role === "employee";
  const isHr = user.role === "hr";
  const isAdmin = user.role === "admin";
  // if user is himself disable every button on his row

  // reusing legacy class names
  const employeeClasses = `${styles["roles-permissions__role-btn"]}${
    isEmployee ? ` ${styles["roles-permissions__role-btn--active"]}` : ""
  }`;
  const hrClasses = `${styles["roles-permissions__role-btn"]}${
    isHr ? ` ${styles["roles-permissions__role-btn--active"]}` : ""
  }`;
  const adminClasses = `${styles["roles-permissions__role-btn"]} ${styles["roles-permissions__admin-toggle"]}${
    isAdmin ? ` ${styles["roles-permissions__role-btn--active"]}` : ""
  }`;

  return (
    <div className={styles["roles-permissions__row"]}>
      <div className={styles["roles-permissions__row-name"]}>
        <img
          src={user.user_avatar || "/assets/employee.png"}
          alt="employee avatar"
          className={styles["roles-permissions__avatar"]}
        />
        <span className={styles["roles-permissions__name-text"]}>
          {user.first_name} {user.last_name}
        </span>
      </div>
      <div className={styles["roles-permissions__row-address"]}>
        <button
          type="button"
          className={employeeClasses}
          onClick={() => onUpdate("employee")}
          disabled={isSelf || isUpdating}
        >
          EMPLOYEE
        </button>
        <button
          type="button"
          className={hrClasses}
          onClick={() => onUpdate("hr")}
          disabled={isSelf || isUpdating}
        >
          HR
        </button>
      </div>
      <div className={styles["roles-permissions__row-vacation"]}>
        <button
          type="button"
          className={`${styles["roles-permissions__role-btn"]} ${styles["roles-permissions__role-btn--active"]}`}
          disabled={isSelf}
        >
          EMPLOYEE
        </button>
        <button
          type="button"
          className={styles["roles-permissions__role-btn"]}
          disabled={isSelf}
        >
          PO
        </button>
        <button
          type="button"
          className={styles["roles-permissions__role-btn"]}
          disabled={isSelf}
        >
          DD
        </button>
      </div>
      <div className={styles["roles-permissions__row-admin"]}>
        <button
          type="button"
          className={adminClasses}
          onClick={() => onUpdate("admin")}
          disabled={isSelf || isUpdating}
        >
          ADMIN
        </button>
      </div>
    </div>
  );
};

