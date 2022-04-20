import React from "react";
import cs from "classnames";
import { isMobile } from "@features/utils";
import './wrapper.scss'
type WrapperProps = {
  children: any;
  className?: string;
};
const Wrapper = (props: WrapperProps) => {
  return (
    <div className={cs("chore-wrapper", { isPc: !isMobile() },props.className)}>
      {props.children}
    </div>
  );
};
export default Wrapper;
