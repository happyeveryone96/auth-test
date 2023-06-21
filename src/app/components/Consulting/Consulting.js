import React from "react";
import { Link } from "react-router-dom";
import "./Consulting.css";

const Consulting = (props) => {
  const { id, authorId, authorImage, authorName, createdAt, body, title } =
    props.consulting;

  return (
    <div className="consulting-container">
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
        </div>

        <Link to={`/consulting/${id}`} className="preview-link">
          <h1>{title}</h1>
          <p>{body}</p>
          <span>Read more...</span>
        </Link>
      </div>
    </div>
  );
};

export default Consulting;
