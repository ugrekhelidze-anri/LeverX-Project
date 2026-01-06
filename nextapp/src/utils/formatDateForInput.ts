import { IDateOfBirth } from "../types/User";

// Format date for HTML date input (YYYY-MM-DD)
export const formatDateForInput = (dateObj: IDateOfBirth): string => {
  const { year, month, day } = dateObj;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

