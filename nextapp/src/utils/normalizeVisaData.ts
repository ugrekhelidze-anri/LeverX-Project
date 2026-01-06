import { IUser, IVisa } from "../types/User";

// Parse into useable format so we don't keep getting undefined on the page
export const normalizeVisaData = (userInfo: IUser): IUser => {
  const visas = userInfo.visa || [];

  const formatTime = (v: IVisa): string =>
    `${new Date(v.start_date).toLocaleDateString("en-GB")} - ${new Date(
      v.end_date
    ).toLocaleDateString("en-GB")}`;

  // Visa 1
  const v1 = visas[0];
  userInfo.visa1 = v1?.type || "-";
  userInfo.visa1_period = v1 ? formatTime(v1) : "-";

  // if Visa 2
  if (visas[1]) {
    const v2 = visas[1];
    userInfo.visa2 = v2?.type || "-";
    userInfo.visa2_period = v2 ? formatTime(v2) : "-";
  } else {
    userInfo.visa2 = "-";
    userInfo.visa2_period = "-";
  }

  return userInfo;
};
