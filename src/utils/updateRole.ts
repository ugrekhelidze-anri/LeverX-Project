import { useUpdateUserRoleMutation } from "../features/user/usersApiSlice";

export function useUpdateRole() {
  const [updateUserRole] = useUpdateUserRoleMutation();

  return async (role: string, id: number) => {
    try {
      // call api to update role using RTK Query
      const result = await updateUserRole({ id, role }).unwrap();
      // util returns true if successful update. else false
      return result.success || false;
    } catch (error) {
      // catch error
      console.log(error);
      return false;
    }
  };
}
