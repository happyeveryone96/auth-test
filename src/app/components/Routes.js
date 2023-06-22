import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home";
import Settings from "../pages/Settings/Settings";
import LectureDetail from "../pages/LectureDetail/LectureDetail";
import ConsultingPage from "../pages/ConsultingPage";
import ConsultingDetail from "../pages/ConsultingDetail/ConsultingDetail";
import MentorPage from "../pages/MentorPage";
import MentorDetail from "../pages/MentorDetail/MentorDetail";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/consulting" element={<ConsultingPage />} />
      <Route path="/mentor" element={<MentorPage />} />
      <Route path="/mentor/:id" element={<MentorDetail />} />
      <Route path="/consulting/:id" element={<ConsultingDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/lecture/:id" element={<LectureDetail />} />
    </Routes>
  );
};

export default MainRouter;
