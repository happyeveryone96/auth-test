import React, { useState, useEffect } from "react";
import Consulting from "app/components/Consulting/Consulting";
import CONSULTING_DATA from "app/data/consultingData";

interface ConsultingData {
  id: number;
  authorId: number;
  authorName: string;
  authorImage: string;
  title: string;
  body: string;
  createdAt: string;
}

const ConsultingPage = () => {
  const [data, setData] = useState<ConsultingData[] | null>(null);

  useEffect(() => {
    setData(CONSULTING_DATA);
  }, []);

  if (!data) {
    return null;
  }

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
