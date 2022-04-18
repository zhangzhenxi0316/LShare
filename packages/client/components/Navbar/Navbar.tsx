import React from "react";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="nav-bar">
      <div className="logo-info">
          <div className="logo-image"></div>
        <div className="logo-title">LShare</div>
      </div>
      <div className="nav-more"></div>
    </div>
  );
};
export default Navbar;
