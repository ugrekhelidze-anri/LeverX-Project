import { ISignUpData } from "../types/Auth";
import { useSignUpMutation } from "../features/user/usersApiSlice";
import { TRtkError } from "../types/Query";

export function useSignUpUser() {
  const [signUpMutation] = useSignUpMutation();

  return async (data: ISignUpData) => {
    try {
      // make a request to our backend to register using RTK Query
      const result = await signUpMutation(data).unwrap();
      return result;
    } catch (error) {
      const err = error as TRtkError; // cast error so eslint stops complaining
      return {
        success: false,
        error: err?.data?.error || "something went wrong try again later",
      };
    }
  };
}
