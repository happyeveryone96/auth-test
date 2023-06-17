import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [content, setContent] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  const isLogin = accessToken && accessToken.length > 0;

  useEffect(() => {
    setContent(accessToken);
  }, []);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>name: {content === "" ? "X" : username}</h3>
      </header>
    </div>
  );
};

export default Home;
