import React from "react";
import cs from 'classnames'
import "./titlebar.scss";
import { isMobile } from "@features/utils";
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
    <div className={cs("common-titlebar",{isPC: !isMobile()})}>
      <div className="back-icon" onClick={handleBack}></div>
      <div className="back-title">{title}</div>
    </div>
  );
};
export default Titlebar;
