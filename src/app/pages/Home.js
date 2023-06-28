import React, { useState, useEffect } from "react";
import UserService from "app/services/user.service";
import Lecture from "app/components/Lecture/Lecture";
import LECTURE_DATA from "app/data/lectureData";
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
    if (accessToken && isLoggedIn) {
      UserService.getUserProfile(accessToken)
        .then((response) => {
          if (response.status === 200) {
            const { username } = response.data;
            if (!userName) {
              localStorage.setItem("username", username);
            }
          }
        })
        .catch((error) => {
          return error;
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
