import { IUser } from "../types/User";

export const canUserEdit = (
  currentUser: IUser | null,
  userInfo: IUser | null
) => {
  // if user isnt logged in or user info is missing return false
  if (!currentUser || !userInfo) return false;

  // check if current user is admin or if its their manager, if not return false
  const isAdmin = currentUser.role === "admin";
  const isManagingHr =
    currentUser.role === "hr" &&
    userInfo.manager?.id !== undefined && // check if manager id is defined so it doesnt crash
    String(userInfo.manager.id) === String(currentUser._id);

  return isAdmin || isManagingHr;
};
