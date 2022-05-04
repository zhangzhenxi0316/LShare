import axiosInstance from "common/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RequireAuth.scss";

function RequireAuth({ children }: any) {
  const navigate = useNavigate();
  const [isValidate, setIsValidate] = useState(false);
  const loginIsValidate = async () => {
    const user_id = JSON.parse(localStorage.getItem("user") || "{}")._id;
    const res = await axiosInstance.get("/login/isValidate");
    console.log(res.data.code, res.data.user_id, user_id);
    if (res.data.code !== 200 || res.data.user_id !== user_id) {
      setIsValidate(false);
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      setIsValidate(true);
    }
  };
  useEffect(() => {
    loginIsValidate();
  }, []);
  return isValidate ? ( // 判断 localstorage 中登录状态是否为 true
    <>{children
    }</>
  ) : (
    <div className="auth-loading">
      <div className="loading-icon"></div>
    </div>
  );
}
export default RequireAuth;
