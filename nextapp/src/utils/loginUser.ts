import { useLoginMutation } from "../features/user/usersApiSlice";
import { TRtkError } from "../types/Query";

export function useLoginUser() {
  const [loginMutation] = useLoginMutation();

  return async (
    email: string,
    password: string,
    keepLoggedIn: boolean = false
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await loginMutation({ email, password }).unwrap();
      const storageLocation = keepLoggedIn ? localStorage : sessionStorage; // decide where to store info

      // if login successful store session data
      if (response.success && response.data) {
        storageLocation.setItem("userId", response.data._id); // store user ID
        storageLocation.setItem("isLoggedIn", "true"); // mark as logged in
        return { success: true };
      } else {
        storageLocation.setItem("isLoggedIn", "false");
        storageLocation.removeItem("userId");
        return { success: false, error: response.error }; // return error directly
      }
    } catch (error) {
      const err = error as TRtkError; // cast error so eslint stops complaining

      return {
        success: false,
        error: err?.data?.error || "Something went wrong",
      };
    }
  };
}
