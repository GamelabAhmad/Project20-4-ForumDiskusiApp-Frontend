import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import HeadingText from "../atoms/HeadingText/index.jsx";
import Cookies from "js-cookie";
import AuthTableAdminForum from "../organisms/AuthTableAdminForum/index.jsx";
import AuthTableAdminTopic from "../organisms/AuthTableAdminTopic/index.jsx";
import AuthTableAdminQuestion from "../organisms/AuthTableAdminQuestion/index.jsx";
import TypographyText from "../atoms/TypographyText/index.jsx";
import IconPlaceholder from "../atoms/IconPlaceholder/index.jsx";

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
            <div className="py-3">
              <TypographyText
                cssReset={true}
                className="text-center alert alert-primary"
                role="alert"
              >
                <IconPlaceholder variant={"info-circle"} className="me-2" />
                Welcome to your dashboard{" "}
                <span className="text-primary">{user}</span>! Here you can view
                your recent activities.
              </TypographyText>
            </div>
            <div className="d-flex flex-column align-items-center">
              <button
                className="btn btn-primary my-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseQuestion"
                aria-expanded="false"
                aria-controls="collapseQuestion"
              >
                Toggle Question Table
              </button>
              <div className="collapse w-100" id="collapseQuestion">
                <div className="card card-body table-responsive">
                  <AuthTableAdminQuestion />
                </div>
              </div>
              <button
                className="btn btn-primary my-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseForum"
                aria-expanded="false"
                aria-controls="collapseForum"
              >
                Toggle Forum Table
              </button>
              <div className="collapse w-100" id="collapseForum">
                <div className="card card-body table-responsive">
                  <AuthTableAdminForum />
                </div>
              </div>
              <button
                className="btn btn-primary my-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTopic"
                aria-expanded="false"
                aria-controls="collapseTopic"
              >
                Toggle Topic Table
              </button>
              <div className="collapse w-100 mb-3" id="collapseTopic">
                <div className="card card-body table-responsive">
                  <AuthTableAdminTopic />
                </div>
              </div>
            </div>
          </ContainerLayout>
        </PagesLayout>
      </>
    );
  } else {
    window.location.href = "/";
    return null;
  }
}
