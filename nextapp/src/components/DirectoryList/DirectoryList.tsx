"use client";

import Image from "next/image";
import { IUser } from "../../types/User";
import { TViewMode } from "../../types/Search";
import { isUserRemote } from "../../utils/isUserRemote";
import styles from "./DirectoryList.module.scss";

type DirectoryListProps = {
  users: IUser[];
  viewMode: TViewMode;
  onUserClick: (id: IUser["_id"]) => void;
};

export const DirectoryList = ({
  users, // user data
  viewMode, // display type
  onUserClick, // click handler
}: DirectoryListProps) => (
  <div
    className={`${styles["directory__list"]} ${styles["employee-table"]} ${
      viewMode === "list" ? styles["directory__list--active"] : ""
    }`}
  >
    <div className={styles["employee-table__header"]}>
      <div className={styles["employee-table__header-photo"]}>
        <span>Photo</span>
      </div>
      <div className={styles["employee-table__header-name"]}>
        <span>Name</span>
      </div>
      <div className={styles["employee-table__header-department"]}>
        <span>Department</span>
      </div>
      <div className={styles["employee-table__header-room"]}>
        <span>Room</span>
      </div>
    </div>
    <div className={styles["employee-table__rows"]}>
      {users.map((user) => {
        // if user is remote display home icon
        const remote = isUserRemote(user);
        return (
          <div
            key={user._id}
            className={styles["employee-table__row"]}
            data-id={String(user._id)}
            onClick={() => onUserClick(user._id)}
          >
            <div className={styles["employee-table__avatar-wrapper"]}>
              <Image
                src="/assets/employee.png"
                alt="employee"
                className={styles["employee-table__avatar"]}
                width={70}
                height={70}
              />
              {remote ? (
                <Image
                  src="/assets/home.png"
                  alt="remote-badge"
                  className={styles["employee-table__remote-badge"]}
                  width={29}
                  height={29}
                />
              ) : null}
            </div>
            <span className={styles["employee-table__name"]}>
              {user.first_name} {user.last_name}
            </span>
            <span className={styles["employee-table__department"]}>
              {user.department}
            </span>
            <span className={styles["employee-table__room"]}>{user.room}</span>
          </div>
        );
      })}
    </div>
  </div>
);

