import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import QuestionForm from "../organisms/QuestionForm/index.jsx";

export default function CreateQuestionPagesLayout() {
  return (
    <>
      <PagesLayout>
        <ContainerLayout>
          <QuestionForm />
        </ContainerLayout>
      </PagesLayout>
    </>
  );
}
