import AvatarPlaceHolder from "../../atoms/AvatarPlaceholder";
import TypographyText from "../../atoms/TypographyText";

export default function UserPostDate() {
  return (
    <>
      <div className="d-flex flex-row">
        <AvatarPlaceHolder className="rounded-circle border border-dark img-fluid w-25 h-25" src="https://png.pngtree.com/png-clipart/20230426/original/pngtree-school-logo-design-template-png-image_9104626.png"></AvatarPlaceHolder>
        <TypographyText className="text-primary pe-2 font-bold">Lorem Ipsum</TypographyText>
        <TypographyText className="font-bold">30 seconds</TypographyText>
      </div>
    </>
  );
}
