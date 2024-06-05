import TypographyText from "../../atoms/TypographyText";
import IconPlaceholder from "../../atoms/IconPlaceholder";

export default function Sidebar() {
  const sidebarList = [
    {
      id: 1,
      href: "/",
      variant: "house",
      text: "Home",
    },
    {
      id: 2,
      href: "/question",
      variant: "question-circle",
      text: "Question",
    },
    {
      id: 3,
      href: "/forum",
      variant: "globe",
      text: "Forum",
    },
    {
      id: 4,
      href: "/topic",
      variant: "chat-quote",
      text: "Topic",
    },
  ];

  return (
    <>
      <ul className="list-unstyled">
        {sidebarList.map((sidebar) => (
          <>
            <li key={sidebar.id}>
              <a
                href={sidebar.href}
                className="d-flex gap-2 align-items-center text-decoration-none text-dark"
              >
                <IconPlaceholder variant={sidebar.variant} />
                <TypographyText className="d-flex align-items-center m-0">
                  {sidebar.text}
                </TypographyText>
              </a>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}
