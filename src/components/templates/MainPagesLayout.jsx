import Sidebar from "../molecules/Sidebar/index.jsx";
import Card from "../molecules/Card/index.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import PagesLayout from "./PagesLayout.jsx";
import CardHeader from "../organisms/CardHeader/index.jsx";
import CardPost from "../organisms/CardPost/index.jsx";

export default function MainPagesLayout() {
  return (
    <>
      <PagesLayout>
        <ContainerLayout>
          <div className="row">
            <aside className="col-12 col-lg-2 mb-3 mb-lg-0">
              <Card className="shadow-sm">
                <Sidebar />
              </Card>
            </aside>
            <div className="col-12 col-lg-10 mb-3">
              <CardHeader
                title={"Welcome to Twenties!"}
                description={
                  "Twenties is are a website of Forum Discussion App where you can ask questions and share your knowledge with others. You can also follow other users, like their questions and answers, and comment on them."
                }
                buttonTitle={"Ask a Question"}
                toastsMessage={"ask a question"}
              />
            </div>
            <div className="col-12 col-lg-10 ms-auto mb-3">
              <CardPost>
                title={"Latest Questions"}
                description={"Here are the latest questions from our users"}
                author={"Twenties"}
                date={"2021-09-01"}
                votes={"10"}
                comments={"5"}
              </CardPost>
            </div>
          </div>
        </ContainerLayout>
      </PagesLayout>
    </>
  );
}
