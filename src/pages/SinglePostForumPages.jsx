import SinglePostForumPagesLayout from "../components/templates/SinglePostForumPagesLayout.jsx";
import Cookies from "js-cookie";

export default function SinglePostForumPages() {
  const token = Cookies.get("jwt");

  if (!token) {
    window.location.href = "/";
    return null;
  }

  return (
    <>
      <SinglePostForumPagesLayout />
    </>
  );
}
