import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Login/Login";
import Register from "./Register/Register";
import Home from "./Home";
import Settings from "./Settings";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default MainRouter;
