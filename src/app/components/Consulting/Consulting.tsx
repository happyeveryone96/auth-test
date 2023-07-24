import React from 'react';
import { Link } from 'react-router-dom';
import css from 'app/components/Consulting/Consulting.module.css';
import { Like, Views, Comment } from './Icons';
import { Solved, UnSolved } from './Solved';

interface ConsultingType {
  consulting: {
    id: number;
    authorId: number;
    authorImage: string;
    authorName: string;
    createdAt: string;
    body: string;
    title: string;
    kindof: string;
    like: number;
    views: number;
    comment: number;
    solved: boolean;
  };
}

const Consulting = (props: ConsultingType) => {
  const {
    id,
    authorId,
    authorImage,
    authorName,
    createdAt,
    body,
    title,
    like,
    comment,
    views,
    solved,
  } = props.consulting;

  return (
    <div className={css['consulting-container']}>
      <div>
        <div className={css['title']}>
          {solved ? <Solved /> : <UnSolved />}
          <Link to={`/consulting/${id}`} className={css['consulting-preview']}>
            <h5>{title}</h5>
          </Link>
        </div>
        <p>{body}</p>
        <div className={css['profile']}>
          <div className={css['profile-box']}>
            <Link to={`/profile/${authorId}`}>
              <img
                className={css['author-profile-img']}
                src={authorImage}
                alt="강사 프로필 사진"
              />
            </Link>
            <div className={css['author-box']}>
              <Link className={css['author']} to={`/profile/${authorId}`}>
                {authorName}
              </Link>
            </div>
            <div className={css['date']}>{createdAt}</div>
          </div>
          <div className={css['reactions']}>
            <div className={css['reaction']}>
              <Like />
              {like}
            </div>
            <div className={css['reaction']}>
              <Views />
              {views}
            </div>
            <div className={css['reaction']}>
              <Comment />
              {comment}
            </div>
            <div>{solved}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consulting;
