import AvatarPlaceHolder from "../../atoms/AvatarPlaceholder";
import TypographyText from "../../atoms/TypographyText";

export default function ForumMember() {
  const forumMember = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg",
      alt: "avatar-1",
      widthAvatar: "30px",
      heightAvatar: "30px",
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg",
      alt: "avatar-2",
      widthAvatar: "30px",
      heightAvatar: "30px",
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg",
      alt: "avatar-3",
      widthAvatar: "30px",
      heightAvatar: "30px",
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg",
      alt: "avatar-4",
      widthAvatar: "30px",
      heightAvatar: "30px",
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg",
      alt: "avatar-5",
      widthAvatar: "30px",
      heightAvatar: "30px",
    },
  ];
  return (
    <>
      <div className="d-flex gap-2">
        {forumMember.map((member) => (
          <AvatarPlaceHolder
            key={member.id}
            src={member.src}
            alt={member.alt}
            widthAvatar={member.widthAvatar}
            heightAvatar={member.heightAvatar}
          />
        ))}
        <TypographyText
          className="text-black"
          variant="body2"
          children="and others"
        />
      </div>
    </>
  );
}
