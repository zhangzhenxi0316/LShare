import React from "react";
import Navbar from "components/Navbar/Navbar";
import Tabs from "components/Tabs/Tabs";
import Wrapper from "components/Wrapper/Wrapper";
import Detail from "entry/Detail/Detail";
import FollowForYou from "entry/FollowForYou/FollowForYou";
import Home from "entry/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import FollowList from "entry/FollowList/FollowList";
import My from "entry/My/My";
import Push from "entry/Push/Push";
import Login from "entry/Login/Login";
function Chore() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Tabs />
    </>
  );
}
export default function AppRoute() {
  return (
    <Wrapper>
      <Router>
        <Routes>
          <Route path="/">
            <Route path="/home" element={<Chore />}>
              <Route path="" element={<Home />}></Route>
              <Route path="detail" element={<Detail />}></Route>
              <Route path="follow-foryou" element={<FollowForYou />}></Route>
              <Route path="follow-list" element={<FollowList />}></Route>
              <Route path="my" element={<My />}></Route>
              <Route path="push" element={<Push />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>
        </Routes>
      </Router>
    </Wrapper>
  );
}
