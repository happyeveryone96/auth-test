import React from 'react';
import css from './HotContent.module.css';
import CONSULTING_DATA from 'app/data/consultingData';
import { Link } from 'react-router-dom';

export function Hot() {
  // 정렬 기능은 서버쪽에서 받는 데이터로

  return (
    <div className={css['wrapper']}>
      <div className={css['title']}> 주간 인기글 </div>
      <ul className="nav nav-underline">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            전체
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            미해결
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            해결됨
          </a>
        </li>
      </ul>
      {CONSULTING_DATA.map((consulting) => {
        return (
          <div className={css['content']}>
            <Link to={`/consulting${consulting.id}`} key={consulting.id}>
              {consulting.title.slice(0, 25).trim()}...
            </Link>
            <p className={css['createdAt']} key={consulting.id}>
              {consulting.createdAt}
            </p>
          </div>
        );
      })}
    </div>
  );
}
