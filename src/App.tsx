import { Route, Routes, useLocation } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage/IndexPage";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { UserDetailsPage } from "./pages/UserDetailsPage/UserDetails";
import { UserRolesPage } from "./pages/UserRolesPage/UserRolesPage";
import { NotFound } from "./components/NotFound/NotFound";
import { Header } from "./components/Header/Header";
import { MobileMenu } from "./components/MobileMenu/MobileMenu";
import { useUserContext } from "./hooks/useUserContext";
import { toggleMobileMenu } from "./utils/toggleMobileMenu";
import { signOut } from "./utils/signOut";
import { getActiveTab } from "./utils/getActiveTab";

export const App = () => {
  const location = useLocation(); // get current url path
  const { user } = useUserContext(); // user context
  const { mobileOpen, toggleMobile, closeMobile } = toggleMobileMenu(); // mobile menu toggler

  // check if route is protected, every route other than /auth
  const isProtectedRoute = location.pathname !== "/auth";

  return (
    <>
      {/* header and mobile menu in one place instead of many pages */}
      {isProtectedRoute && (
        <>
          <Header
            currentUser={user}
            mobileOpen={mobileOpen}
            onMenuToggle={toggleMobile}
            onSignOut={signOut}
            whichTabIsOpen={getActiveTab(location.pathname)}
          />
          <MobileMenu
            currentUser={user}
            mobileOpen={mobileOpen}
            onClose={closeMobile}
            onSignOut={signOut}
          />
        </>
      )}
      <Routes>
        <Route element={<ProtectedRoute />}>
          {/* protected routes */}
          <Route path="/" element={<IndexPage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
          <Route path="/permissions" element={<UserRolesPage />} />
        </Route>
        {/* public routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
