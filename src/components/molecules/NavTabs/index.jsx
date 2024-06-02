import { useState } from "react";

export default function NavTabs() {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const navTabs = [
    {
      id: "tab1",
      title: "Latest",
      content: "Content for latest tab...",
    },
    {
      id: "tab2",
      title: "Hot",
      content: "Content for hot/popular tab...",
    },
    {
      id: "tab3",
      title: "Week",
      content: "Content for weekly tab...",
    },
    {
      id: "tab4",
      title: "Month",
      content: "Content for monthly tab...",
    },
  ];

  return (
    <>
      <nav className="nav nav-pills bg-body-secondary flex-column flex-sm-row rounded-5">
        {navTabs.map((tab) => (
          <a
            key={tab.id}
            className={
              activeTab === tab.id
                ? "flex-sm-fill text-sm-center nav-link active"
                : "flex-sm-fill text-sm-center nav-link"
            }
            onClick={() => handleTabClick(tab.id)}
            href={`#${tab.id}`}
          >
            {tab.title}
          </a>
        ))}
      </nav>
      <div className="tab-content">
        {navTabs.map((tab) => (
          <div
            key={tab.id}
            className={
              activeTab === tab.id
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
            id={tab.id}
          >
            <p>{tab.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}
