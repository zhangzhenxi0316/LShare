import Feed from "components/Feed/Feed";
import React, { useEffect } from "react";
import "./followForYou.scss";
const test: any = [];
const FollowForYou = () => {
  useEffect(() => {
    const element = document.querySelector(".container");
    element?.scrollTo({ top: 0 });
  }, []);
  return (
    <div id="follow">
      <Feed articleGroups={test} />
    </div>
  );
};
export default FollowForYou;
