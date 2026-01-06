import { Dispatch, SetStateAction } from "react";
import { IUser } from "../types/User";
import { useUpdateRole } from "./updateRole";

export function useHandleRoleUpdate() {
  const updateRole = useUpdateRole();

  return async (
    role: "employee" | "hr" | "admin",
    id: number,
    setPendingId: Dispatch<SetStateAction<number | null>>,
    setUsers: Dispatch<SetStateAction<IUser[]>>
  ) => {
    setPendingId(id);
    // call updaterole util to process and call api
    const updated = await updateRole(role, id);

    // if role got updated return updated users
    if (updated) {
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? { ...user, role } : user))
      );
    }

    // after completed empty the pending id
    setPendingId(null);
  };
}
