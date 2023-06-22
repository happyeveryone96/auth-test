import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "app/pages/Login/Login";
import Register from "app/pages/Register/Register";
import Home from "app/pages/Home";
import Settings from "app/pages/Settings/Settings";
import LectureDetail from "app/pages/LectureDetail/LectureDetail";
import ConsultingPage from "app/pages/ConsultingPage";
import ConsultingDetail from "app/pages/ConsultingDetail/ConsultingDetail";
import MentorPage from "app/pages/MentorPage";
import MentorDetail from "app/pages/MentorDetail/MentorDetail";

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
