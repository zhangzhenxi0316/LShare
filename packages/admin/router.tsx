import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";

import Article from "./entry/Article/Article";
import Log from "./entry/Log/Log";
import Login from "./entry/Login/Login";
import User from "./entry/User/User";
import Wrapper from "./Wrapper/Wrapper";
function Chore() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}
export default function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Chore />}>
          <Route path="/admin/article" element={<Article />}></Route>
          <Route path="/admin/user" element={<User />}></Route>
          <Route path="/admin/log" element={<Log />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
