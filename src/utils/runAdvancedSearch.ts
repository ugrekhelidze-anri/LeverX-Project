import { IUser } from "../types/User";
import { TAdvancedFilters } from "../types/Search";

export const runAdvancedSearch = (
  userData: IUser[],
  filters: TAdvancedFilters
): IUser[] => {
  const normalized = {
    name: filters.name.trim().toLowerCase(),
    email: filters.email.trim().toLowerCase(),
    phone: filters.phone.trim().toLowerCase(),
    skype: filters.skype.trim().toLowerCase(),
    building: filters.building.toLowerCase(),
    room: filters.room.trim().toLowerCase(),
    department: filters.department.toLowerCase(),
  };

  return userData.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const matchesName = !normalized.name || fullName.includes(normalized.name);
    const matchesEmail =
      !normalized.email ||
      (user.email && user.email.toLowerCase().includes(normalized.email));
    const matchesPhone =
      !normalized.phone ||
      (user.phone && user.phone.toLowerCase().includes(normalized.phone));
    const matchesSkype =
      !normalized.skype ||
      (user.skype && user.skype.toLowerCase().includes(normalized.skype));
    const matchesBuilding =
      normalized.building === "any" ||
      (user.building && user.building.toLowerCase() === normalized.building);
    const matchesRoom =
      !normalized.room ||
      (user.room && user.room.toLowerCase().includes(normalized.room));
    const matchesDepartment =
      normalized.department === "any" ||
      (user.department &&
        user.department.toLowerCase() === normalized.department);

    // return the user if it matches any of these conditions
    return (
      matchesName &&
      matchesEmail &&
      matchesPhone &&
      matchesSkype &&
      matchesBuilding &&
      matchesRoom &&
      matchesDepartment
    );
  });
};
