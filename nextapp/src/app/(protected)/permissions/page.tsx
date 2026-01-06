"use client";
import { useEffect, useMemo, useState } from "react";
import { RolesEmptyRow } from "@/components/UserRoleRow/RolesEmptyRow";
import { RolesLoadingRow } from "@/components/UserRoleRow/RolesLoadingRow";
import { UserRoleRow } from "@/components/UserRoleRow/UserRoleRow";
import { useUserContext } from "@/hooks/useUserContext";
import { IUser } from "@/types/User";
import { searchByName } from "@/utils/searchByName";
import { useGetUsersQuery } from "@/features/user/usersApiSlice";
import { useHandleRoleUpdate } from "@/utils/handleRoleUpdate";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

const UserRolesPage = () => {
  const { user: currentUser, loading: loadingCurrent } = useUserContext();
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingId, setPendingId] = useState<number | null>(null);
  const router = useRouter();

  // Use RTK to fetch users
  const { data: fetchedUsers = [], isLoading: loadingUsers } =
    useGetUsersQuery();
  const handleRoleUpdate = useHandleRoleUpdate();

  // Update local users state when fetched users change
  useEffect(() => {
    setUsers(fetchedUsers);
  }, [fetchedUsers]);

  // users that are currently displayed are  cached so we dont have ro rerender every search
  const visibleUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return users.filter((user) => searchByName(user, term)); // call our search by name util
  }, [users, searchTerm]);

  // if current user is not logged in or isnt an admin return to index page
  if (!loadingCurrent && currentUser && currentUser.role !== "admin") {
    return router.push("/");
  }

  // current user id
  const loggedInId = currentUser?._id;

  return (
    <>
      <main className={`${styles["roles-permissions"]} page--fade-in`}>
        <div className={styles["roles-permissions__card"]}>
          <div className={styles["roles-permissions__header"]}>
            <h1>ROLES & PERMISSIONS</h1>
          </div>

          <div className={styles["roles-permissions__table"]}>
            <div className={styles["roles-permissions__table-header"]}>
              <div className={styles["roles-permissions__table-header-search"]}>
                <input
                  type="text"
                  placeholder="Type to search"
                  className={styles["roles-permissions__search-input"]}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div
                className={styles["roles-permissions__table-header-address"]}
              >
                Address book role
              </div>

              <div
                className={styles["roles-permissions__table-header-vacation"]}
              >
                Vacation role
              </div>

              <div className={styles["roles-permissions__table-header-admin"]}>
                Admin
              </div>
            </div>

            <div className={styles["roles-permissions__table-rows"]}>
              {loadingUsers || loadingCurrent ? (
                <RolesLoadingRow />
              ) : visibleUsers.length === 0 ? (
                <RolesEmptyRow />
              ) : (
                visibleUsers.map((user) => (
                  <UserRoleRow
                    key={user._id}
                    user={user}
                    isSelf={loggedInId === user._id}
                    isUpdating={pendingId === user._id}
                    onUpdate={(role) =>
                      handleRoleUpdate(role, user._id, setPendingId, setUsers)
                    }
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserRolesPage;
