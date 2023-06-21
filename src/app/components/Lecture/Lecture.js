import React from "react";
import "./Lecture.css";
import { Link } from "react-router-dom";

const Lecture = (props) => {
  const {
    id,
    authorId,
    authorImage,
    authorName,
    createdAt,
    desc,
    favoritesCount,
    title,
  } = props.lecture;

  return (
    <div className="lecture-container">
      <div className="article-preview">
        <div className="profile">
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

          <div className="info">
            <button className="btn btn-sm pull-xs-right">
              <i className="ion-heart"></i>
              <span className="counter"> {favoritesCount} </span>
            </button>
          </div>
        </div>

        {/* <div className="article-preview">Loading articles...</div> */}
        <Link to={`/lecture/${id}`} className="preview-link">
          <h1>{title}</h1>
          <p>{desc}</p>
          <span>Read more...</span>
        </Link>
      </div>

      {/* <div className="article-preview">No articles are here... yet.</div> */}
    </div>
  );
};

export default Lecture;
