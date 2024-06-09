import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import HeadingText from "../atoms/HeadingText/index.jsx";
import TypographyText from "../atoms/TypographyText/index.jsx";

export default function DashboardPagesLayout() {
  const user = localStorage.getItem("user");

  return (
    <>
      <PagesLayout>
        <ContainerLayout>
          <HeadingText
            cssReset={true}
            className="text-center fw-semibold text-primary"
          >
            Dashboard
          </HeadingText>
          <TypographyText cssReset={true} className="text-center">
            Welcome to your dashboard {user}! Here you can view your recent
            activities and manage your account.
          </TypographyText>
        </ContainerLayout>
      </PagesLayout>
    </>
  );
}
