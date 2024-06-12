import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import AuthTopicForm from "../organisms/AuthTopicForm/index.jsx";
import AuthForumForm from "../organisms/AuthForumForm/index.jsx";
import HeadingText from "../atoms/HeadingText/index.jsx";
import Cookies from "js-cookie";
import Card from "../molecules/Card/index.jsx";
import SubheadingText from "../atoms/SubheadingText/index.jsx";
import AuthTableAdmin from "../organisms/AuthTableAdminQuestion/index.jsx";
import AuthTableAdminForum from "../organisms/AuthTableAdminForum/index.jsx";
import AuthTableAdminTopic from "../organisms/AuthTableAdminTopic/index.jsx";

export default function AuthAdminPagesLayout() {
  const user = Cookies.get("user");
  const allowedUsers = ["restu", "dina", "alixa", "rama", "josua", "Twenties"];

  if (allowedUsers.includes(user)) {
    return (
      <>
        <PagesLayout>
          <ContainerLayout>
            <HeadingText
              children={"Admin Page"}
              className="fw-semibold text-primary text-center my-3"
            />
            <AuthTableAdmin />
            <AuthTableAdminForum />
            <AuthTableAdminTopic />
            <Card className="p-4 mb-3">
              <SubheadingText className="text-primary">
                Topic Form
              </SubheadingText>
              <AuthTopicForm />
            </Card>
            <Card className="p-4 mb-3">
              <SubheadingText className="text-primary">
                Forum Form
              </SubheadingText>
              <AuthForumForm />
            </Card>
          </ContainerLayout>
        </PagesLayout>
      </>
    );
  } else {
    window.location.href = "/";
    return null;
  }
}
