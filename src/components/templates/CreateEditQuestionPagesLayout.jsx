import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import QuestionForm from "../organisms/QuestionForm/index.jsx";
import HeadingText from "../atoms/HeadingText/index.jsx";
import Button from "../atoms/Button/index.jsx";
import IconPlaceholder from "../atoms/IconPlaceholder/index.jsx";
import { Link } from "react-router-dom";
import EditForm from "../organisms/EditForm/index.jsx";

export default function CreateEditQuestionPagesLayout({ title }) {
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
          {title === "Ask a Question" ? <QuestionForm /> : <EditForm />}
        </ContainerLayout>
      </PagesLayout>
    </>
  );
}
