export function signOut() {
  // remove from both session and local
  localStorage.removeItem("userId");
  localStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("isLoggedIn");

  // relaod the window after removing from storage so protectpage kicks in
  window.location.reload();
}
