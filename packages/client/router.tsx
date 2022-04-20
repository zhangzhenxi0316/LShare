import React, { useState } from "react";
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
  Navigate,
} from "react-router-dom";
import FollowList from "entry/FollowList/FollowList";
import My from "entry/My/My";
import Push from "entry/Push/Push";
import Login from "entry/Login/Login";
import RequireAuth from "components/RequireAuth/RequireAuth";

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
          {/* <Route path="/"> */}

          <Route path="/home" element={<Chore />}>
            <Route path="" element={<Home />}></Route>
            <Route path="follow-foryou" element={<FollowForYou />}></Route>
            <Route path="follow-list" element={<FollowList />}></Route>
            <Route path="push" element={<Push />}></Route>
            <Route
              path="my"
              element={
                <RequireAuth>
                  <My />
                </RequireAuth>
              }
            ></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/article/:id" element={<Detail />}></Route>
          {/* </Route> */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </Wrapper>
  );
}
// http://localhost:9102/main.31dd70e4a367ec1e4363.bundle.js
// http://localhost:9102/home/main.92f0713f2b6606540889.bundle.js
