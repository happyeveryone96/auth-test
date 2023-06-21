import React, { useState, useEffect } from "react";
import LECTURE_DETAIL_DATA from "../../data/lectureDetailData";
import { Link } from "react-router-dom";

const LectureDetail = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(LECTURE_DETAIL_DATA);
  }, []);
  const { authorId, authorImage, title, desc, authorName, createdAt } = data;

  return (
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{title}</h1>
          <div className="profile-box">
            <Link to={`/profile/${authorId}`}>
              <img
                className="author-profile-img"
                src={authorImage}
                alt="강사 프로필 사진"
              />
            </Link>
            <div className="author-box">
              <Link className="author" to={`/profile/${authorId}`}>
                {authorName}
              </Link>
              <div className="date">{createdAt}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="container page">
        <div class="row article-content">
          <div class="col-xs-12">
            <div>{desc}</div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default LectureDetail;
