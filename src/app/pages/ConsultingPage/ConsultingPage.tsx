import React, { useState, useEffect } from 'react';
import Consulting from 'app/components/Consulting/Consulting';
import CONSULTING_DATA from 'app/data/consultingData';
import css from './ConsultingPage.module.css';
import { Hot } from 'app/components/Consulting/HotContent';

interface ConsultingData {
  id: number;
  authorId: number;
  authorName: string;
  authorImage: string;
  title: string;
  body: string;
  createdAt: string;
  kindof: string;
  like: number;
  views: number;
  comment: number;
  solved: boolean;
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
    <div className={css['wrapper']}>
      <Hot />
      <div className="home-page">
        {data.map((consulting) => (
          <Consulting key={consulting.id} consulting={consulting} />
        ))}
      </div>
    </div>
  );
};

export default ConsultingPage;
