import DashboardPagesLayout from "../components/templates/DashboardPagesLayout.jsx";
import Cookies from "js-cookie";

export default function DashboardPages() {
  const token = Cookies.get("jwt");

  if (!token) {
    window.location.href = "/";
    return null;
  }

  return (
    <>
      <DashboardPagesLayout />
    </>
  );
}
