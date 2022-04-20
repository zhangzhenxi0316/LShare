import axiosInstance from "common/axios";
import Titlebar from "components/TitleBar/TitleBar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.scss";
const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState<{
    code: number;
    message: string;
  }>({} as any);
  const usernameChange = (e: any) => {
    setUsername(e.target.value);
  };
  const passwordChange = (e: any) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const login = async (e: any) => {
    console.log(username, password);
    if (username === "" || password === "") {
      setLoginMessage({ code: 400, message: "用户名密码不能为空" });
      setTimeout(() => {
        setLoginMessage({ code: 0, message: "" });
      }, 2000);
      return;
    }
    const loginRes = await axiosInstance.post("/login", { username, password });
    console.log("code", loginRes.data);
    if (loginRes.data.code === 200) {
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));
      // 成功登陆back
      navigate("/home");
    } else {
      setPassword("");
      setLoginMessage(loginRes.data);
      setTimeout(() => {
        setLoginMessage({ code: 0, message: "" });
      }, 2000);
    }
  };
  const handleBack = ()=>{
    navigate("/home");
  }
  return (
    <div className="login-box">
      {/* <div className="login-titlebar">
        <div className="back-icon" onClick={handleBack}></div>
        <div className="back-title">Create Account/Login</div>
      </div> */}
      <Titlebar title="Create Account/Login" onBack={handleBack}/>
      <div className="login-container">
        <div className="login-title">使用用户名密码登陆</div>
        <div className="login-username">
          <div className="login-text">用户名:</div>
          <input type="text" onChange={usernameChange} />
        </div>
        <div className="login-password">
          <div className="login-text">密码:</div>
          <input type="text" onChange={passwordChange} value={password} />
        </div>
        <div className="login-button" onClick={login}>
          登陆
        </div>
      </div>
      {loginMessage.code === 400 && (
        <div className="login-message">{loginMessage.message}</div>
      )}
    </div>
  );
};
export default Login;
