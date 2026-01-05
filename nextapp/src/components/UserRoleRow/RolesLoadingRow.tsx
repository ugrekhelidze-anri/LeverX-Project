import styles from "./UserRoleRow.module.scss";

export const RolesLoadingRow = () => (
  <div className={styles["roles-permissions__row"]}>
    <div className={styles["roles-permissions__row-name"]}>
      <span className={styles["roles-permissions__name-text"]}>Loading...</span>
    </div>
  </div>
);

