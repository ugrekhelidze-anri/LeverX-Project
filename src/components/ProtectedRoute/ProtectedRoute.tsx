import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  // check first session storage and then local storage to see if user is logged in
  const isLoggedIn =
    sessionStorage.getItem("isLoggedIn") === "true" ||
    localStorage.getItem("isLoggedIn") === "true";

  // get user id
  const userId =
    sessionStorage.getItem("userId") || localStorage.getItem("userId");

  // if user is not logged in redirect to auth page
  if (!isLoggedIn || !userId) {
    return <Navigate to="/auth" replace />;
  }

  // if everything goes well render the rest of routes
  return <Outlet />;
}
