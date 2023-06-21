import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";
import Lecture from "./Lecture/Lecture";
import LECTUREDATA from "../data/lectureData";

const Home = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("username");

  const [data, setData] = useState([]);
  useEffect(() => {
    setData(LECTUREDATA);
  }, []);

  useEffect(() => {
    if (accessToken) {
      UserService.getUserProfile(accessToken).then((response) => {
        const { username } = response.data;
        if (!userName) {
          localStorage.setItem("username", username);
        }
      });
    }
  }, [userName, accessToken]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">GPTUs</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      {data.map((lecture) => (
        <Lecture key={lecture.id} lecture={lecture} />
      ))}
    </div>
  );
};

export default Home;
