import { ArticleType } from "common/types/article";
import React from "react";
import cs from "classnames";
import "./articleCard.scss";
import { UserType } from "common/types/user";
import { useNavigate } from "react-router-dom";

const ArticleCard = (props: ArticleType) => {
  const navigator = useNavigate();
  const {
    covers = [],
    title,
    author = {} as UserType,
    diggCount,
    isDigg,
    _id,
  } = props;
  const cover = covers[0]?.match(/^http:\/\//)
    ? covers[0]
    : `http://${covers[0]}`;
  const handleClick = () => {
    navigator(`/article/${_id}`, { state: props });
  };
  return (
    <div className="article-card-container" onClick={handleClick}>
      <img className="article-thumb" src={cover}></img>
      <div className="article-content">{title}</div>
      <div className="article-author">
        <img className="author-avatar" src={author.avatarUrl}></img>
        <div className="author-name">{author.userName}</div>
        <div className="digg-container">
          <div className={cs("digg-icon", { digg: isDigg })}></div>
          <div className="digg-count">{diggCount}</div>
        </div>
      </div>
    </div>
  );
};
export default ArticleCard;
