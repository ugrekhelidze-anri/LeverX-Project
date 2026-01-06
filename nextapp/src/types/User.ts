// sharede interfaces to reuse later

export interface IDateOfBirth {
  year: number;
  month: number;
  day: number;
}

export interface IManager {
  id: string;
  first_name: string;
  last_name: string;
}

export interface IVisa {
  type: string;
  start_date: number;
  end_date: number;
}

export interface IUser {
  _id: number;
  isRemoteWork: boolean;
  user_avatar: string;
  first_name: string;
  last_name: string;
  first_native_name: string;
  last_native_name: string;
  middle_native_name: string;
  department: string;
  building: string;
  room: string;
  date_birth: IDateOfBirth;
  desk_number: number;
  manager: IManager;
  phone: string;
  email: string;
  skype: string;
  cnumber: string;
  citizenship: string;
  visa: IVisa[];
  passwordHash: string;
  role: "employee" | "admin" | "hr";

  // fields added by visadata
  visa1?: string;
  visa1_period?: string;
  visa2?: string;
  visa2_period?: string;
}
