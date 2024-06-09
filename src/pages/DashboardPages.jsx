import DashboardPagesLayout from "../components/templates/DashboardPagesLayout.jsx";

export default function DashboardPages() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token === "null" || user === "null") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
    return null;
  }

  return (
    <>
      <DashboardPagesLayout />
    </>
  );
}
