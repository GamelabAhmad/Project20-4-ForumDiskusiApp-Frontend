import AvatarPlaceHolder from "../../atoms/AvatarPlaceholder";
import TypographyText from "../../atoms/TypographyText";

export default function UserPostDate({
  imgSrc,
  imgAlt,
  username,
  createdAt,
  className,
  ...props
}) {
  return (
    <>
      <div className={`d-flex flex-row gap-2 ${className}`} {...props}>
        <AvatarPlaceHolder
          className="rounded-circle border border-dark img-fluid"
          src={imgSrc}
          alt={imgAlt}
          heightAvatar={30}
          widthAvatar={30}
        />
        <div className="d-flex gap-2 align-items-center m-0">
          <TypographyText cssReset={true} className="text-primary fw-bold">
            {username}
          </TypographyText>
          <TypographyText cssReset={true} className="fw-semibold">
            {createdAt}
          </TypographyText>
        </div>
      </div>
    </>
  );
}
