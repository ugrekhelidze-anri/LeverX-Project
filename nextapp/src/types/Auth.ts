export interface ILoginResponse {
  success: boolean;
  data?: { _id: string };
  error?: string;
}

export interface ISignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
