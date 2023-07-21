import React from 'react';
import css from 'app/components/Consulting/Consulting.module.css';

export function Solved() {
  return <div className={css['solved']}>해결</div>;
}

export function UnSolved() {
  return <div className={css['unsolved']}>미해결</div>;
}
