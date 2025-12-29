import { IUser } from "../types/User";

export const runSearch = (
  userData: IUser[],
  searchTerm: string
): IUser[] => {
  // util accepts searchTerm
  const normalized = searchTerm.trim().toLowerCase();
  if (!normalized) return userData; // return if invalid

  // return  every possible match
  return userData.filter((user) => {
    const fullName = (user.first_name + " " + user.last_name).toLowerCase();
    const firstName = user.first_name.toLowerCase();
    const lastName = user.last_name.toLowerCase();
    const id = String(user._id).toLowerCase();

    return (
      id.includes(normalized) ||
      firstName.includes(normalized) ||
      lastName.includes(normalized) ||
      fullName.includes(normalized)
    );
  });
};
