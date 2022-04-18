import { ArticleType } from "common/types/article";
import ArticleCard from "components/ArticleCard/ArticleCard";
import React from "react";
import "./feed.scss";
type FeedProps = {
  articleGroups: Array<Array<ArticleType>>;
};
const Feed = (props: FeedProps) => {
  const { articleGroups } = props;
  const renderGroup = (articleGroup: Array<ArticleType>) => {
    const left = articleGroup.slice(0, Math.ceil(articleGroup.length / 2));
    const right = articleGroup.slice(Math.ceil(articleGroup.length / 2));
    return (
      <div className="feed-article-list">
        <div className="feed-article-list-left">
          {left.map((item) => {
            return <ArticleCard {...item} />;
          })}
        </div>
        <div className="feed-article-list-right">
          {right.map((item) => {
            return <ArticleCard {...item} />;
          })}
        </div>
      </div>
    );
  };
  return (
    <div className="feed-container">
      {articleGroups.map((item) => {
        return renderGroup(item);
      })}
    </div>
  );
};
export default Feed;
