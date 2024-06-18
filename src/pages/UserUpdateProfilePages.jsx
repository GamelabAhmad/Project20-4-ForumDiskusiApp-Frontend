import UserUpdateProfileLayout from "../components/templates/UserUpdateProfileLayout.jsx";
import Cookies from "js-cookie";

export default function UserUpdateProfilePages() {
  const token = Cookies.get("jwt");

  if (!token) {
    window.location.href = "/";
    return null;
  }

  return (
    <>
      <UserUpdateProfileLayout />
    </>
  );
}
