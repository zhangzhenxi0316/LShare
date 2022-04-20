import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "./detail.scss";
import { useLocation, useParams } from "react-router-dom";
import { ArticleType } from "common/types/article";
import { useEffect } from "react";
import axiosInstance from "common/axios";
import FollowButton from "components/FollowButton/FollowButton";
const Detail = (props: any) => {
  const location = useLocation();
  const { id } = useParams();
  const [article, setArticle] = useState<ArticleType>(
    location.state as ArticleType
  );
  const [isLoading, setIsLoading] = useState(!Boolean(location.state));

  const getArticleInfo = async () => {
    const articleRes = await axiosInstance.get(
      `/getArticleInfo?article_id=${id}`
    );
    if (articleRes.data.code === 200) {
      setArticle(articleRes.data.article);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!article) {
      getArticleInfo();
    }
  }, []);
  const handleBack = () => {
    history.back();
  };

  const renderContent = () => {
    console.log('content--->>>--',article.content)
    return (
      <div className="article-detail">
        <div className="article-title-bar">
          <div className="back-icon" onClick={handleBack}></div>
          <img
            className="article-author-avatar"
            src={article.author.avatarUrl}
          ></img>
          <div className="article-author-name">{article.author.userName}</div>
          <FollowButton toUid={article.author._id} />
          <div className="article-more"></div>
        </div>
        <div className="article-carousel">
          <Carousel showIndicators={true} showArrows={false} showThumbs={false}>
            {article.covers.map((item) => {
              return <img className="article-cover" src={item}></img>;
            })}
          </Carousel>
        </div>
        <div className="article-main">
          <div className="article-title">{article.title}</div>
          <pre className="article-content">{article.content}</pre>
        </div>
      </div>
    );
  };
  return (
    <div className="article-box">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-icon"></div>
        </div>
      ) : (
        renderContent()
      )}
    </div>
  );
};
export default Detail;
