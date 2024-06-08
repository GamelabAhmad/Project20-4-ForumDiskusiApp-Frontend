import DashboardPagesLayout from "../components/templates/DashboardPagesLayout.jsx";

export default function DashboardPages() {
  const token = localStorage.getItem("token");
  if (token === "null") {
    window.location.href = "/";
    return null;
  }

  return (
    <>
      <DashboardPagesLayout />
    </>
  );
}
