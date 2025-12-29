import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

export function useHeaderPaths() {
  const navigate = useNavigate();
  const { user } = useUserContext(); // get current logged in user from rtk

  const goHome = () => {
    navigate("/"); // redirect to Index
  };

  const goProfile = () => {
    // redirect to logged in user profile
    if (!user?._id) return;
    navigate(`/users/${user._id}`);
  };

  const goPermissions = () => {
    navigate("/permissions"); // redirect to permissions
  };

  return {
    goHome,
    goProfile,
    goPermissions,
  };
}
