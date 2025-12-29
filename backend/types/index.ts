import { Request, Response } from "express";

export interface IDateBirth {
  year: number;
  month: number;
  day: number;
}

export interface IManager {
  id?: string;
  first_name: string;
  last_name: string;
}

export interface IVisa {
  type: string;
  start_date: number;
  end_date: number;
}

export interface IEmployee {
  _id?: number;
  isRemoteWork: boolean;
  user_avatar: string;
  first_name?: string;
  last_name?: string;
  first_native_name: string;
  last_native_name: string;
  middle_native_name?: string;
  department: string;
  building: string;
  room: string;
  date_birth: IDateBirth;
  desk_number: number | string;
  manager: IManager;
  phone: string;
  email: string;
  passwordHash: string;
  skype: string;
  cnumber: string;
  citizenship: string;
  role: string;
  visa: IVisa[];
  visa1?: string;
  visa1_period?: string;
  visa2?: string;
  visa2_period?: string;
}

export interface IDatabase {
  employees: IEmployee[];
}

export interface ISignUpBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IUpdateRoleBody {
  role: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ILoginResponse {
  _id: number;
  isLoggedIn: boolean;
}

export type RequestHandler = (req: Request, res: Response) => Promise<void>;
