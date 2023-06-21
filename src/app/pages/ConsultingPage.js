import React, { useState, useEffect } from "react";
import Consulting from "../components/Consulting/Consulting";
import CONSULTING_DATA from "../data/consultingData";

const ConsultingPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(CONSULTING_DATA);
  }, []);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">GPTUs</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      {data.map((consulting) => (
        <Consulting key={consulting.id} consulting={consulting} />
      ))}
    </div>
  );
};

export default ConsultingPage;
