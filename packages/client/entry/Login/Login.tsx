import React, { useState } from "react";
import "./login.scss";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameChange = (e: any) => {
    setUsername(e.target.value);
  };
  const passwordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const login = (e: any) => {
      console.log(username,password)
  };
  return (
    <div className="login-box">
      <div className="login-container">
        <div className="login-title">使用用户名密码登陆</div>
        <div className="login-username">
          <div className="login-text">用户名:</div>
          <input type="text" onChange={usernameChange} />
        </div>
        <div className="login-password">
          <div className="login-text">密码:</div>
          <input type="text" onChange={passwordChange} />
        </div>
        <div className="login-button" onClick={login}>
          登陆
        </div>
      </div>
    </div>
  );
};
export default Login;
