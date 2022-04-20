import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import cs from "classnames";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArticleType } from "common/types/article";
import { useEffect } from "react";
import axiosInstance from "common/axios";
import FollowButton from "components/FollowButton/FollowButton";
import "./detail.scss";
const Detail = (props: any) => {
  // const location = useLocation();
  const navigator = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [toast, setToast] = React.useState("");
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const { id } = useParams();
  const [isMine, setIsMine] = useState(false);
  const [article, setArticle] = useState<ArticleType>({} as ArticleType);
  const [liked, setLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const getArticleInfo = async () => {
    const articleRes = await axiosInstance.get(
      `/getArticleInfo?article_id=${id}`
    );
    if (articleRes.data.code === 200) {
      setArticle(articleRes.data.article);
      setLiked(articleRes.data.article.isDigg);
      setIsLoading(false);
    }
  };
  const getIsMine = async () => {
    const res = await axiosInstance.get(`/articleIsMine?article_id=${id}`);
    if (res.data.code === 200) {
      setIsMine(true);
    }
  };
  useEffect(() => {
    getArticleInfo();
    getIsMine();
  }, []);
  const handleBack = () => {
    history.back();
  };
  const handleGotoUser = () => {
    navigator(`/user/${article.author._id}`);
  };
  const handleLike = async () => {
    const res = await axiosInstance.post("/like", {
      is_like: !liked,
      article_id: article._id,
    });
    if (res.data.code === 200) {
      setLiked(res.data.is_like);
    }
    if (res.data.code === 500) {
      navigator("/login");
    }
  };
  const handleDelete = async () => {
    const res = await axiosInstance.post("/deletePost", { article_id: id });
    if (res.data.code === 200) {
      setToast("删除成功");
      setTimeout(() => {
        setToast("");
        navigator("/home/my");
      }, 1000);
    }
  };
  const handleCopyLink = () => {
    window.navigator.clipboard.writeText(window.location.href);
    setToast(`地址复制成功`);
    setTimeout(() => {
      setToast("");
    }, 1000);
  };
  const renderContent = () => {
    return (
      <div className="article-detail">
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="draw-container"
        >
          {isMine && (
            <div className="draw-item" onClick={handleDelete}>
              删除文章
            </div>
          )}
          <div className="draw-item" onClick={handleCopyLink}>
            Copy Link
          </div>
        </Drawer>
        {toast && <div className="toast">{toast}</div>}
        <div className="article-like" onClick={handleLike}>
          <div className={cs("like-icon", { liked })}></div>
        </div>
        <div className="article-title-bar">
          <div className="back-icon" onClick={handleBack}></div>
          <img
            className="article-author-avatar"
            src={article.author.avatarUrl}
            onClick={handleGotoUser}
          ></img>
          <div className="article-author-name">{article.author.userName}</div>
          <FollowButton toUid={article.author._id} />
          <div className="article-more" onClick={toggleDrawer}></div>
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
