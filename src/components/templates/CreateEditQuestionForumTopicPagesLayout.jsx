import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import QuestionForm from "../organisms/QuestionForm/index.jsx";
import HeadingText from "../atoms/HeadingText/index.jsx";
import Button from "../atoms/Button/index.jsx";
import IconPlaceholder from "../atoms/IconPlaceholder/index.jsx";
import { Link } from "react-router-dom";
import EditForm from "../organisms/EditQuestionForm/index.jsx";
import AuthCreateForumForm from "../organisms/AuthCreateForumForm/index.jsx";
import AuthCreateTopicForm from "../organisms/AuthCreateTopicForm/index.jsx";
import AuthEditForumForm from "../organisms/AuthEditForumForm/index.jsx";
import AuthEditTopicForm from "../organisms/AuthEditTopicForm/index.jsx";

export default function CreateEditQuestionForumTopicPagesLayout({ title }) {
  return (
    <>
      <PagesLayout>
        <ContainerLayout>
          <Link to={"/dashboard"} className="text-decoration-none">
            <Button variant={"primary"} className="btn-sm rounded-3">
              <IconPlaceholder variant={"arrow-left"} />
            </Button>
          </Link>
          <HeadingText
            cssReset={true}
            className="fw-semibold text-primary text-center py-3"
          >
            {title}
          </HeadingText>
          {title === "Ask a Question" && <QuestionForm />}
          {title === "Edit a Question" && <EditForm />}
          {title === "Create a Forum" && <AuthCreateForumForm />}
          {title === "Create a Topic" && <AuthCreateTopicForm />}
          {title === "Edit a Forum" && <AuthEditForumForm />}
          {title === "Edit a Topic" && <AuthEditTopicForm />}
        </ContainerLayout>
      </PagesLayout>
    </>
  );
}
