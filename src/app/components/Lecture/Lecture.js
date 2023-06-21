import React from "react";
import css from "./Lecture.module.css";
import { Link } from "react-router-dom";

const Lecture = (props) => {
  const {
    id,
    authorId,
    authorImage,
    authorName,
    createdAt,
    body,
    favoritesCount,
    title,
  } = props.lecture;

  return (
    <div className={css["lecture-container"]}>
      <div className="article-preview">
        <div className={css["profile"]}>
          <div className={css["profile-box"]}>
            <Link to={`/profile/${authorId}`}>
              <img
                className={css["author-profile-img"]}
                src={authorImage}
                alt="강사 프로필 사진"
              />
            </Link>
            <div className={css["author-box"]}>
              <Link className={css["author"]} to={`/profile/${authorId}`}>
                {authorName}
              </Link>
              <div className={css["date"]}>{createdAt}</div>
            </div>
          </div>

          <div className={css["info"]}>
            <button className="btn btn-sm pull-xs-right">
              <i className="ion-heart"></i>
              <span className={css["counter"]}> {favoritesCount} </span>
            </button>
          </div>
        </div>

        <Link to={`/lecture/${id}`} className="preview-link">
          <h1>{title}</h1>
          <p>{body}</p>
          <span>Read more...</span>
        </Link>
      </div>
    </div>
  );
};

export default Lecture;
