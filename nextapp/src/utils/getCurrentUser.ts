import { useLazyGetSingleUserQuery } from "../features/user/usersApiSlice";

export function getUser() {
  // use lazy version since we dont need it to run right away
  const [getUserById] = useLazyGetSingleUserQuery();

  return async () => {
    // first if local storage has it
    let userId = localStorage.getItem("userId");

    // if not this will get triggered
    if (!userId) {
      userId = sessionStorage.getItem("userId");
    }

    // if neither have it that means user isn't logged in return null
    if (!userId) return null;

    try {
      const result = await getUserById(userId);
      if (result.data) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
