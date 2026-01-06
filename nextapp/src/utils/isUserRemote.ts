import { IUser } from "../types/User";

export const isUserRemote = (user: IUser): boolean => {
  return user.isRemoteWork === true;
};
