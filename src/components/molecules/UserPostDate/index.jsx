import AvatarPlaceHolder from "../../atoms/AvatarPlaceholder";
import TypographyText from "../../atoms/TypographyText";

export default function UserPostDate({ src, username, time }) {
  return (
    <>
      <div className="d-flex flex-row gap-2">
        <AvatarPlaceHolder
          className="rounded-circle border border-dark img-fluid"
          src={src}
          heightAvatar={30}
          widthAvatar={30}
        />
        <div className="d-flex gap-2">
          <TypographyText className="text-primary fw-bold">
            {username}
          </TypographyText>
          <TypographyText className="fw-semibold">{time}</TypographyText>
        </div>
      </div>
    </>
  );
}
