import { useState, useEffect } from "react";
import TypographyText from "../../atoms/TypographyText";
import IconPlaceholder from "../../atoms/IconPlaceholder";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState("/");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

    const mediaQuery = window.matchMedia("(max-width: 400px)");
    setIsSmallScreen(mediaQuery.matches);

    const handleMediaQueryChange = (e) => {
      setIsSmallScreen(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  return (
    <>
      {isSmallScreen ? (
        <div className="dropdown d-flex justify-content-between px-3">
          <div className="d-flex align-items-center">
            <TypographyText cssReset={true} className="fw-lighter d-flex gap-1">
              <IconPlaceholder
                variant={
                  sidebarList.find((item) => item.href === activeLink)?.variant
                }
              />
              {sidebarList.find((item) => item.href === activeLink)?.text}
            </TypographyText>
          </div>
          <button
            className="btn btn-primary rounded-3 dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Menu
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {sidebarList.map((sidebar) => (
              <li key={sidebar.id}>
                <Link
                  to={sidebar.href}
                  onClick={() => handleLinkClick(sidebar.href)}
                  className={`dropdown-item d-flex align-items-center gap-2 ${
                    activeLink === sidebar.href ? "active" : ""
                  }`}
                >
                  <IconPlaceholder variant={sidebar.variant} />
                  <TypographyText cssReset={true}>
                    {sidebar.text}
                  </TypographyText>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className="list-unstyled d-flex d-lg-block justify-content-center justify-content-lg-start align-items-center m-0">
          {sidebarList.map((sidebar) => (
            <li key={sidebar.id}>
              <Link
                to={sidebar.href}
                onClick={() => handleLinkClick(sidebar.href)}
                className={`d-flex gap-2 align-items-center text-decoration-none p-2 ${
                  activeLink === sidebar.href
                    ? "bg-primary-subtle text-primary rounded-3"
                    : "text-reset"
                }`}
              >
                <IconPlaceholder variant={sidebar.variant} />
                <TypographyText cssReset={true}>{sidebar.text}</TypographyText>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
