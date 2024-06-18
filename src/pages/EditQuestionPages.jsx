import CreateEditQuestionPagesLayout from "../components/templates/CreateEditQuestionForumTopicPagesLayout.jsx";
import Cookies from "js-cookie";

export default function EditQuestionPages() {
  const token = Cookies.get("jwt");

  if (!token) {
    window.location.href = "/";
    return null;
  }

  return (
    <>
      <CreateEditQuestionPagesLayout title="Edit a Question" />
    </>
  );
}
