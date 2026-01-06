import { IUser } from "../types/User";
import { TEditableUserData } from "./editUserFields";

export function handleFieldChange(
  user: IUser,
  field: keyof TEditableUserData | "manager_name",
  value: string
): IUser {
  if (field === "manager_name") {
    // Parse manager name and update manager object
    const nameParts = value.trim().split(/\s+/);
    const first_name = nameParts[0] || "";
    const last_name = nameParts.slice(1).join(" ") || "";
    return {
      ...user,
      manager: {
        ...user.manager,
        first_name,
        last_name,
      },
    };
  } else if (field === "date_birth") {
    // Parse date string (YYYY-MM-DD) and update date_birth object
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return {
        ...user,
        date_birth: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
        },
      };
    }
    return user;
  } else {
    return {
      ...user,
      [field]: value,
    };
  }
}

