import { useState, useEffect } from "react";
import TypographyText from "../../atoms/TypographyText";
import IconPlaceholder from "../../atoms/IconPlaceholder";

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState("/");

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

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActiveLink(currentPath);
  }, []);

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  return (
    <>
      <ul className="list-unstyled">
        {sidebarList.map((sidebar) => (
          <li key={sidebar.id}>
            <a
              href={sidebar.href}
              onClick={() => handleLinkClick(sidebar.href)}
              className={`d-flex gap-2 align-items-center text-decoration-none p-2 ${activeLink === sidebar.href ? "text-primary" : "text-dark"}`}
            >
              <IconPlaceholder variant={sidebar.variant} />
              <TypographyText cssReset={true}>{sidebar.text}</TypographyText>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
