import AuthAdminPagesLayout from "../components/templates/AuthAdminPagesLayout.jsx";
import Cookies from "js-cookie";

export default function AuthAdminPages() {
  const token = Cookies.get("jwt");

  if (!token) {
    window.location.href = "/";
    return null;
  }

  return (
    <>
      <AuthAdminPagesLayout />
    </>
  );
}
