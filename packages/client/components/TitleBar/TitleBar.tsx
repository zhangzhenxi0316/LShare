import React from "react";
import "./titlebar.scss";
type TitleBarProps = {
  title: string;
  onBack?: any;
};
const Titlebar = (props: TitleBarProps) => {
  const { title, onBack } = props;
  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    history.back();
  };
  return (
    <div className="common-titlebar">
      <div className="back-icon" onClick={handleBack}></div>
      <div className="back-title">{title}</div>
    </div>
  );
};
export default Titlebar;
