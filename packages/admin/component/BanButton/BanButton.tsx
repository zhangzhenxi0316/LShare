import react, { useState } from "react";
import cs from "classnames";
import "./banButton.scss";
import axiosInstance from "../../common/axios";
const BanButton = (props: {
  ban: boolean;
  url: string;
  article_id?: string;
  comment_id?: string;
  user_id?: string;
  className?: string;
}) => {
  const { article_id, className, comment_id, user_id, url } = props;
  const [ban, setBan] = useState(props.ban);
  const handleBan = async () => {
    const res = await axiosInstance.post(props.url, {
      article_id,
      comment_id,
      ban: !ban,
      user_id,
    });
    if (res.data.code === 200) {
      setBan(res.data.ban);
    }
  };
  return (
    <div className={cs("ban", className, { isBan: ban })} onClick={handleBan}>
      {ban ? "已封禁" : "封禁"}
    </div>
  );
};
export default BanButton;
