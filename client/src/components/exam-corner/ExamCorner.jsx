import React from 'react';
import './ExamCorner.css';

const CardLayout = () => {
  const cards = [
    {
      title: 'TimeTable',
      imgSrc: 'https://th.bing.com/th/id/OIP.iviJzwY87xQSLMLQ6G7tWgHaE-?pid=ImgDet&w=164&h=110&c=7&dpr=1.5',
      link: '/time-table'
    },
    {
      title: 'Syllabus',
      imgSrc: 'https://th.bing.com/th/id/OIP.UFKXZSq14XRFIfhDm-NAhQHaF5?pid=ImgDet&w=164&h=130&c=7&dpr=1.5',
      link: '/syllabus'
    },
    {
      title: 'Results',
      imgSrc: 'https://th.bing.com/th/id/OIP._BQGGZoKzvcKDiZkxY54EgHaH0?pid=ImgDet&w=164&h=174&c=7&dpr=1.5',
      link: '/results'
    },
    {
      title: 'Previous Papers',
      imgSrc: 'https://th.bing.com/th/id/OIP.kSXQUXvLTAxdh_KRk9SrrQHaE7?pid=ImgDet&w=164&h=110&c=7&dpr=1.5',
      link: '/previous-papers'
    },
  ];

  return (
    <div className="card-layout">
      {cards.map((card, index) => (
        <div className="card" key={index}>
          <img src={card.imgSrc} alt={card.title} className="card-image" />
          <h3 className="card-title">{card.title}</h3>
          <a href={card.link} className="card-button">
            {card.title === 'TimeTable' ? 'View Time Table' : 'Explore'}
          </a>
        </div>
      ))}
    </div>
  );
};

export default CardLayout;
