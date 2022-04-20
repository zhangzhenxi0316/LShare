import axiosInstance from "common/axios";
import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  const navigator = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const handleLogout = async () => {
    await axiosInstance.post("/logout");
    localStorage.clear();
    navigator('/login')
  };
  return (
    <div className="nav-bar">
      <div className="logo-info">
        <div className="logo-image"></div>
        <div className="logo-title">LShare</div>
      </div>
      <div className="nav-more" onClick={toggleDrawer}></div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
      >
        <div className="nav-container">
          <div className="drawer-item">关于我们</div>
          <div className="drawer-item">法律条纹</div>
          <div className="drawer-item logout" onClick={handleLogout}>
            退出登陆
            <div className="logout-icon"></div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
export default Navbar;
