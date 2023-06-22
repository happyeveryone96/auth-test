import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import Lecture from "../components/Lecture/Lecture";
import LECTURE_DATA from "../data/lectureData";
import { useSelector } from "react-redux";

const Home = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("username");

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);
  useEffect(() => {
    setData(LECTURE_DATA);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      UserService.getUserProfile(accessToken).then((response) => {
        const { username } = response.data;
        if (!userName) {
          localStorage.setItem("username", username);
        }
      });
    }
  }, [userName, accessToken, isLoggedIn]);

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
