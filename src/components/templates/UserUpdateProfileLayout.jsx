import HeadingText from "../atoms/HeadingText/index.jsx";
import PagesLayout from "./PagesLayout.jsx";
import ContainerLayout from "./ContainerLayout.jsx";
import UserUpdateProfileForm from "../organisms/UserUpdateProfileForm/index.jsx";

export default function UserUpdateProfileLayout() {
  return (
    <>
      <PagesLayout>
        <ContainerLayout>
          <HeadingText
            cssReset={true}
            children="Edit Profile"
            className="text-primary text-center fw-semibold "
          />
          <UserUpdateProfileForm />
        </ContainerLayout>
      </PagesLayout>
    </>
  );
}
