import { useState } from "react";
import IconPlaceholder from "../../atoms/IconPlaceholder/index.jsx";

export default function NavTabs({ onTabClick }) {
  const [activeTab, setActiveTab] = useState("tab2");

  const handleTabClick = (tabId, event) => {
    setActiveTab(tabId);
    onTabClick(tabId, event);
  };

  const navTabs = [
    {
      id: "tab1",
      title: "Oldest",
      icon: "sort-down",
    },
    {
      id: "tab2",
      title: "Latest",
      icon: "sort-up",
    },
  ];

  return (
    <>
      <nav className="nav nav-pills bg-primary-subtle flex-column flex-sm-row rounded-3">
        {navTabs.map((tab) => (
          <a
            key={tab.id}
            className={
              activeTab === tab.id
                ? "flex-sm-fill text-center nav-link active d-flex gap-2 justify-content-center"
                : "flex-sm-fill text-center nav-link d-flex gap-2 justify-content-center"
            }
            onClick={(event) => handleTabClick(tab.id, event)}
            href={`#${tab.id}`}
          >
            <IconPlaceholder variant={tab.icon} />
            {tab.title}
          </a>
        ))}
      </nav>
    </>
  );
}
