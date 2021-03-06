import React, { useRef, useState } from "react";
import "./push.scss";
import axiosInstance from "common/axios";
import { ArticleType } from "common/types/article";
const Push = () => {
  const [localImageUrls, setLocalImageurls] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [articleImageUrls, setArticleImageUrls] = useState<any>([]);
  const [title, setTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const onImageChange = async (e: any) => {
    e.preventDefault();
    let fileList = e.target.files;
    if (fileList.length > 6) {
      fileList = fileList.slice(0, 4);
    }
    let localUrls = [];
    let ImageUrls = [];
    for (let i = 0; i < fileList.length; i++) {
      const formData = new FormData();
      formData.append("file", fileList[i]);
      let uploadRes = await axiosInstance.post("/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(uploadRes);
      const ImageUrl = uploadRes.data.url;
      const localUrl = URL.createObjectURL(fileList[i]);
      localUrls.push(localUrl);
      ImageUrls.push(ImageUrl);
    }
    setLocalImageurls([...localImageUrls, ...localUrls]);
    setArticleImageUrls([...articleImageUrls, ...ImageUrls]);
  };
  const titleChange = (e: any) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const contentChange = (e: any) => {
    e.preventDefault();
    setArticleContent(e.target.value);
  };
  const toast = (text: string) => {
    setMessage(text);
    setTimeout(() => {
      setMessage("");
    }, 1000);
  };
  const handlePublish = async () => {
    console.log("1111111", title, articleContent, articleImageUrls);
    if (
      title === "" ||
      articleContent === "" ||
      articleImageUrls.length === 0
    ) {
      toast("标题或者正文或者封面不能为空");
      return;
    }

    const publishRes = await axiosInstance.post(
      "/upload/publish",
      {
        covers: articleImageUrls,
        title,
        content: articleContent,
      }
    );
    console.log("publishRes", publishRes);
    if (publishRes.data.code !== 200) {
      toast(`发文失败 原因: ${publishRes.data.message}`);
    } else {
      toast("发文成功");
      setArticleContent("");
      setArticleImageUrls([]);
      setLocalImageurls([]);
      setTitle("");
    }
  };
  return (
    <div className="push-container">
      <div className="upload-image-preview">
        <div className="upload-image-area">
          <div className="upload-image-button">
            <input
              type="file"
              onChange={onImageChange}
              accept="image/gif,image/jpeg,image/jpg,image/png"
              multiple
            />
            <div className="upload-button-image"></div>
          </div>
          {localImageUrls.map((item: string) => {
            return <img className="image" key={item} src={item}></img>;
          })}
        </div>
      </div>
      <div className="article-title">
        <div className="article-title-text">标题: </div>
        <input
          type="text"
          placeholder="请输入标题"
          onChange={titleChange}
          value={title}
        />
      </div>
      <div className="article-content">
        <div className="article-content-text">正文:</div>
        <textarea
          placeholder="请输入正文"
          onChange={contentChange}
          value={articleContent}
        />
      </div>
      <div className="article-submit" onClick={handlePublish}>
        提交
      </div>
      {Boolean(message) && <div className="publish-toast">{message}</div>}
    </div>
  );
};
export default Push;
