import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserService from "../services/user.service";

const Home = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [user, setUser] = useState("");
  const userName = localStorage.getItem("username");
  const { userId, email, username } = user;
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      UserService.getUserProfile(accessToken).then(
        (response) => {
          setUser(response.data);
          const { username } = response.data;
          if (!userName) {
            localStorage.setItem("username", username);
          }
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          setUser(_content);
        }
      );
    } else {
      setUser("");
    }
  }, [userName, accessToken]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h2>Home</h2>
        <h3>Id: {isLoggedIn && userId}</h3>
        <h3>Email: {isLoggedIn && email}</h3>
        <h3>Username: {isLoggedIn && username}</h3>
      </header>
    </div>
  );
};

export default Home;
