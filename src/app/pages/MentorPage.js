import React, { useState, useEffect } from "react";
import Mentor from "../components/Mentor/Mentor";
import MENTOR_DATA from "../data/mentorData";

const MentorPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(MENTOR_DATA);
  }, []);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">GPTUs</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      {data.map((mentor) => (
        <Mentor key={mentor.id} mentor={mentor} />
      ))}
    </div>
  );
};

export default MentorPage;
