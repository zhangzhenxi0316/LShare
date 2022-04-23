import React, { useState } from "react";

import axiosInstance from "../../common/axios";
import { ArticleType } from "../../common/types/article";
import cs from "classnames";
import "./article.scss";
import BanButton from "../../component/BanButton/BanButton";
type StateType = "search" | "detail";
const Article = () => {
  // const []
  const [state, setState] = useState<StateType>("search");
  const [gid, setGid] = useState("");
  const [article, setArticle] = useState<ArticleType>({} as ArticleType);
  const [toast, setToast] = useState<any>();
  const handleSearch = async () => {
    console.log(gid);
    const articleRes = await axiosInstance.get(
      `/admin/getArticleInfo?article_id=${gid}`
    );
    const toastFunc = (text: string) => {
      setToast(text);
      setTimeout(() => {
        setToast("");
      }, 1000);
    };
    if (articleRes.data.code !== 200) {
      toastFunc(articleRes.data.message);
    } else {
      setArticle(articleRes.data.article);
      setState("detail");
      setGid("");
    }
  };
  const searchChange = (e: any) => {
    e.preventDefault();
    setGid(e.target.value);
  };
  const renderSearch = () => {
    return (
      <div className="center">
         {toast &&  <div className="toast">{toast}</div>}
        <div className="text">GID</div>
        <input type="text" onChange={searchChange} value={gid}></input>
        <div className="submit" onClick={handleSearch}>
          搜索
        </div>
      </div>
    );
  };

  const renderArticle = () => {
    return (
      <div className="article-card">
        <div className="article">
          <div className="article-name">{article.title}</div>
          <div className="article-id">{article._id}</div>
          <BanButton
            ban={article.ban}
            url="/admin/article_ban"
            article_id={article._id}
            comment_id=""
          />
        </div>
        <div className="comment-list">
          <div className="title">评论列表</div>
          {article.comments.map((item) => {
            return (
              <div className="comment-item">
                <div className="comment-id">{item._id}</div>
                <div className="comment-content">{item.content}</div>

                <BanButton
                  ban={item.ban}
                  url="/admin/comment_ban"
                  article_id={article._id}
                  comment_id={item._id}
                ></BanButton>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div className="article-container">
      {state === "search" ? renderSearch() : renderArticle()}
    </div>
  );
};
export default Article;
