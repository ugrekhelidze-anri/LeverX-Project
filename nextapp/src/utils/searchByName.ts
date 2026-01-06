import { IUser } from "../types/User";

export const searchByName = (user: IUser, term: string) => {
  if (!term) return true; // if term isnt specified return
  const first = user.first_name.toLowerCase();
  const last = user.last_name.toLowerCase();
  const fullName = `${first} ${last}`;
  const concatenated = `${first}${last}`;

  // return matches or move to next condition
  return (
    first.includes(term) ||
    last.includes(term) ||
    fullName.includes(term) ||
    concatenated.includes(term)
  );
};
