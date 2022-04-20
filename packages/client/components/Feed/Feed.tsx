import { ArticleType } from "common/types/article";
import ArticleCard from "components/ArticleCard/ArticleCard";
import React from "react";
import "./feed.scss";
type FeedProps = {
  articleGroups: Array<Array<ArticleType>>;
};
const Group = ({ articleGroup }: { articleGroup: Array<ArticleType> }) => {
  const left = articleGroup.slice(0, Math.ceil(articleGroup.length / 2));
  const right = articleGroup.slice(Math.ceil(articleGroup.length / 2));
  return (
    <div className="feed-article-list">
      <div className="feed-article-list-left">
        {left.map((item) => {
          return <ArticleCard key={item._id} {...item} />;
        })}
      </div>
      <div className="feed-article-list-right">
        {right.map((item, index) => {
          return <ArticleCard key={item._id} {...item} />;
        })}
      </div>
    </div>
  );
};
const Feed = (props: FeedProps) => {

  const { articleGroups } = props;
  console.log(articleGroups)
  
  return (
    <div className="feed-container">
      {articleGroups.map((item, index) => {
        // return renderGroup(item);
        return <Group key={index} articleGroup={item} />;
      })}
    </div>
  );
};
export default Feed;
