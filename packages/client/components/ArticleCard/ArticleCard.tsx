import { ArticleType } from "common/types/article";
import React from "react";
import cs from "classnames";
import "./articleCard.scss";

const ArticleCard = (props: ArticleType) => {
  const { image, title, author, diggCount, isDigg } = props;
  return (
    <div className="article-card-container">
      <img className="article-thumb" src={image[0]}></img>
      <div className="article-content">{title}</div>
      <div className="article-author">
        <img className="author-avatar" src={author.avatarUrl}></img>
        <div className="author-name">{author.name}</div>
        <div className="digg-container">
          <div className={cs("digg-icon", { digg: isDigg })}></div>
          <div className="digg-count">{diggCount}</div>
        </div>
      </div>
    </div>
  );
};
export default ArticleCard;
