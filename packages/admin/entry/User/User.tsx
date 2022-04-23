import React, { useState } from "react";
import axiosInstance from "../../common/axios";
import { UserType } from "../../common/types/user";
import BanButton from "../../component/BanButton/BanButton";
import "./user.scss";
const User = () => {
  const [uid, setUid] = useState("");
  const [user, setUser] = useState<UserType>({} as UserType);
  const [toast, setToast] = useState<any>();

  const searchChange = (e: any) => {
    e.preventDefault();
    setUid(e.target.value);
  };
  const handleSearch = async (e: any) => {
    if (uid === "") {
      return;
    }
    const res = await axiosInstance.get(`/getUserInfo?user_id=${uid}`);
    if (res.data.code === 200) {
      setUser(res.data.userInfo);
    } else {
      toastFunc("id不存在");
    }
  };
  const toastFunc = (text: string) => {
    setToast(text);
    setTimeout(() => {
      setToast("");
    }, 1000);
  };
  return (
    <div className="user-container">
      {toast && <div className="toast">{toast}</div>}
      <div className="search">
        <div className="search-container">
          <div className="text">UID</div>
          <input type="text" onChange={searchChange} value={uid}></input>
          <div className="submit" onClick={handleSearch}>
            搜索
          </div>
        </div>
      </div>
      {Object.keys(user).length > 0 && (
        <>
          <BanButton
            className="button"
            url="/admin/user_ban"
            ban={user.ban}
            user_id={uid}
          />
          <pre className="user-info">{JSON.stringify(user,null,2)}</pre>
        </>
      )}
    </div>
  );
};
export default User;
