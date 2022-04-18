import React from "react";
import { Link } from "react-router-dom";
import "./tabs.scss";
const Tabs = () => {
  const tabs = [
    {
      name: "feed",
      link: "/home",
    },
    {
      name: "follow",
      link: "/home/follow-foryou",
    },
    {
      name: "push",
      link: "/home/push",
    },
    {
      name: "list",
      link: "/home/follow-list",
    },
    {
      name: "my",
      link: "/home/my",
    },
  ];
  return (
    <div className="bottom-tabs">
      {tabs.map((item) => {
        return (
          <div className="tabs-item">
            <Link
              to={item.link}
              className="tabs-link"
            >
              <div className={`icon tabs-item-${item.name}`}></div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Tabs;
