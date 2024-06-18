import CreateEditQuestionPagesLayout from "../components/templates/CreateEditQuestionForumTopicPagesLayout.jsx";
import Cookies from "js-cookie";

export default function AuthCreateTopicFormPages() {
  const token = Cookies.get("jwt");

  if (!token) {
    window.location.href = "/";
    return null;
  }

  return (
    <>
      <CreateEditQuestionPagesLayout title="Create a Topic" />
    </>
  );
}
