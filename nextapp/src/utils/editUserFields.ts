import { useUpdateUserMutation } from "../features/user/usersApiSlice";
import { IUser } from "../types/User";
import { TRtkError } from "../types/Query";

export type TEditableUserData = Partial<IUser>;

// RTK Query error type

// uses RTK Query to update user
export function useEditUserFields() {
  const [updateUser] = useUpdateUserMutation(); // call rtk hook

  // return update function
  return async (id: number, data: TEditableUserData) => {
    try {
      return await updateUser({ id, data }).unwrap();
    } catch (error) {
      const err = error as TRtkError; // cast error so eslint stops complaining

      return {
        // return false and error if failed
        success: false,
        error: err?.data?.error ?? "failed to update user fields",
      };
    }
  };
}
