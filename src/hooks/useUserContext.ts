import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { setUser, setLoading } from "../features/user/userSlice";
import { useGetCurrentUser } from "../utils/getCurrentUser";

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);

// Hook that replaces usercontext
export const useUserContext = () => {
  const dispatch = useAppDispatch(); // dispatch from rtk so we can call actions on user
  const user = useAppSelector((state) => state.user.user); // get user state from rtk
  const loading = useAppSelector((state) => state.user.loading); // get loading state from rtk
  const getCurrentUser = useGetCurrentUser();

  // refresh user function
  const refreshUser = async () => {
    // set loading true initially
    dispatch(setLoading(true));

    // get user
    const fetchedUser = await getCurrentUser();
    dispatch(setUser(fetchedUser));

    // disable after it runs
    dispatch(setLoading(false));
  };

  // refresh user with useEffect
  useEffect(() => {
    refreshUser();
  }, []);

  return {
    user,
    loading,
    refreshUser,
  };
};
