import React, { useRef, useState } from "react";
import axiosInstance from "common/axios";
import "./editor.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { UserType } from "common/types/user";

const Editor = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const userInfo: UserType = (location.state || {}) as UserType;
  const [message, setMessage] = useState("");
  const [localImage, setlocalImage] = useState<any>(userInfo.avatarUrl);
  const [avatarUrl, setavatarUrl] = useState<any>(userInfo.avatarUrl);
  const [userName, setUserName] = useState(userInfo.userName);
  const [desc, setDesc] = useState(userInfo.description);

  const onImageChange = async (e: any) => {
    e.preventDefault();
    let fileList = e.target.files;
    let file = fileList[0];


    const formData = new FormData();
    formData.append("file", file);
    let uploadRes = await axiosInstance.post("/upload/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const ImageUrl = uploadRes.data.url;
    const localUrl = URL.createObjectURL(file);

    setlocalImage(localUrl);
    setavatarUrl(ImageUrl);
  };
  const userNameChange = (e: any) => {
    e.preventDefault();
    setUserName(e.target.value);
  };
  const descChange = (e: any) => {
    e.preventDefault();
    setDesc(e.target.value);
  };

  const toast = (text: string) => {
    setMessage(text);
    setTimeout(() => {
      setMessage("");
    }, 1000);
  };

  const handlePublish = async () => {
    const publishRes = await axiosInstance.post("/upload/editorUser", {
      avatarUrl,
      userName,
      description: desc,
    });

    if (publishRes.data.code !== 200) {
      toast(`更新失败 原因: ${publishRes.data.message}`);
    } else {
      toast("编辑成功");
      navigator('/home/my')
    }
  };
  const handleBack = () => {
    history.back();
  };
  return (
    <div className="editor-container">
      <div className="editor-titlebar">
        <div className="back-icon" onClick={handleBack}></div>
        <div className="back-title">Create Account/Login</div>
      </div>
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
          <img className="image" src={localImage}></img>
        </div>
      </div>
      <div className="username">
        <div className="username-text">名字: </div>
        <input
          type="text"
          placeholder="编辑UserName"
          onChange={userNameChange}
          value={userName}
        />
      </div>
      <div className="desc">
        <div className="desc-text">个性签名:</div>
        <textarea
          placeholder="请输入个性签名"
          onChange={descChange}
          value={desc}
        />
      </div>
      <div className="editor-submit" onClick={handlePublish}>
        提交
      </div>
      {Boolean(message) && <div className="publish-toast">{message}</div>}
    </div>
  );
};
export default Editor;
