import { useState } from "react";

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
    },
    {
      id: "tab2",
      title: "Latest",
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
                ? "flex-sm-fill text-center nav-link active"
                : "flex-sm-fill text-center nav-link"
            }
            onClick={(event) => handleTabClick(tab.id, event)}
            href={`#${tab.id}`}
          >
            {tab.title}
          </a>
        ))}
      </nav>
    </>
  );
}
