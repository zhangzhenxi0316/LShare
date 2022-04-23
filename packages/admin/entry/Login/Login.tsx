import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../common/axios";
import "./login.scss";
type InputType = "userName" | "password";
const Login = () => {
  const navigator = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");

  const inputChange = (e: any, type: InputType) => {
    e.preventDefault();
    if (type === "userName") setUserName(e.target.value);
    if (type === "password") setPassword(e.target.value);
  };
  const toastFunc = (text: string) => {
    setToast(text);
    setTimeout(() => {
      setToast("");
    }, 1000);
  };
  const handleLogin = async () => {
    const res = await axiosInstance.post("/admin/login", {
      userName,
      password,
    });
    if (res.data.code === 200) {
      navigator("/admin/article");
    } else {
      toastFunc("登陆失败");
    }
  };
  return (
    <div className="login">
      {toast && <div className="toast">{toast}</div>}
      <div className="title">管理员登陆</div>
      <div className="login-item">
        <div className="text">用户名</div>
        <input
          type="text"
          onChange={(e: any) => {
            inputChange(e, "userName");
          }}
          placeholder="请输入管理员用户名"
          value={userName}
        />
      </div>
      <div className="login-item">
        <div className="text">密码</div>
        <input
          type="password"
          onChange={(e: any) => {
            inputChange(e, "password");
          }}
          placeholder="请输入管理员密码"
          value={password}
        />
      </div>
      <div className="submit" onClick={handleLogin}>
        登陆
      </div>
    </div>
  );
};
export default Login;
