import { IDateOfBirth } from "../types/User";

// parse date into useable format
export const formatDate = (dateObj: IDateOfBirth): string => {
  const { year, month, day } = dateObj;
  const jsDate = new Date(year, month - 1, day);
  const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
  return jsDate.toLocaleDateString("en-US", options);
};

