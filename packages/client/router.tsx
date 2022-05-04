import React, { Suspense, useState } from "react";
import Navbar from "components/Navbar/Navbar";
import Tabs from "components/Tabs/Tabs";
import Wrapper from "components/Wrapper/Wrapper";
import Detail from "entry/Detail/Detail";
// import FollowForYou from "entry/FollowForYou/FollowForYou";
// import Home from "entry/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
// import FollowList from "entry/FollowList/FollowList";
// import My from "entry/My/My";
// import Push from "entry/Push/Push";
import Login from "entry/Login/Login";
import RequireAuth from "components/RequireAuth/RequireAuth";
import Editor from "entry/Editor/Editor";
import User from "entry/User/User";

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
const Home = React.lazy(() => import("./entry/Home/Home"));
const FollowList = React.lazy(() => import("./entry/FollowList/FollowList"));
const FollowForYou = React.lazy(
  () => import("./entry/FollowForYou/FollowForYou")
);
const Push = React.lazy(() => import("./entry/Push/Push"));
const My = React.lazy(() => import("./entry/My/My"));
export default function AppRoute() {
  return (
    <Wrapper>
      <Router>
        <Routes>
          {/* <Route path="/"> */}

          <Route path="/home" element={<Chore />}>
            <Route
              path=""
              element={
                <Suspense fallback={<div>Loading... </div>}>
                  <Home />
                </Suspense>
              }
            ></Route>
            <Route
              path="follow-foryou"
              element={
                <RequireAuth>
                  <Suspense fallback={<div>Loading... </div>}>
                  <FollowForYou />
                </Suspense>
                </RequireAuth>
              }
            ></Route>
            <Route
              path="follow-list"
              element={
                <RequireAuth>
                  <Suspense fallback={<div>Loading... </div>}>
                  <FollowList />
                </Suspense>
                </RequireAuth>
              }
            ></Route>
            <Route
              path="push"
              element={
                <RequireAuth>
                  <Suspense fallback={<div>Loading... </div>}>
                  <Push/>
                </Suspense>
                </RequireAuth>
              }
            ></Route>
            <Route
              path="my"
              element={
                <RequireAuth>
                  <Suspense fallback={<div>Loading... </div>}>
                  <My/>
                </Suspense>
                </RequireAuth>
              }
            ></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/article/:id" element={<Detail />}></Route>
          <Route path="/editor" element={<Editor />}></Route>
          <Route path="/user/:id" element={<User />}></Route>
          {/* </Route> */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </Wrapper>
  );
}
