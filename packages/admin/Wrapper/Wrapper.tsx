import React from "react";
import { useNavigate } from "react-router-dom";
import "./wrapper.scss";
const Wrapper = (props: any) => {
  const navigator = useNavigate();
  const handleArticleGO = () => {
    navigator("/admin/article");
  };
  const handleUserGO = () => {
    navigator("/admin/user");
  };
  const handleLogGO = () => {
    navigator("/admin/log");
  };
  return (
    <div className="wrapper-container">
      <div className="slider">
        <div className="item" onClick={handleArticleGO}>
          文章管理
        </div>
        <div className="item" onClick={handleUserGO}>用户管理</div>
        <div className="item" onClick={handleLogGO}>操作日志</div>
      </div>
      <div className="right">
        <div className="top">管理平台</div>
        <div className="main">{props.children}</div>
      </div>
    </div>
  );
};
export default Wrapper;
