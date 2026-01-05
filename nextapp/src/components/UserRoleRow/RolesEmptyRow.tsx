import styles from "./UserRoleRow.module.scss";

export const RolesEmptyRow = () => (
  <div className={styles["roles-permissions__row"]}>
    <div className={styles["roles-permissions__row-name"]}>
      <span className={styles["roles-permissions__name-text"]}>Users not found</span>
    </div>
  </div>
);

