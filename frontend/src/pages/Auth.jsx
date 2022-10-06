import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../components/Login";
import Signup from "../components/Signup";
import Feed from "../pages/Feed";
import PrivateRoutes from "../components/PrivateRoutes";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

function Auth() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="signup" element={<Signup />} />
        <Route element={<PrivateRoutes />}>
          <Route exact path="feed" element={<Feed />} />
          <Route exact path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Auth;
