import React from 'react';
import './ExamCorner.css';
import { useNavigate } from "react-router-dom";

const ExamCorner = () => {
  const cards = [
    { title: 'TimeTable', imgSrc: 'https://t4.ftcdn.net/jpg/02/99/06/99/360_F_299069957_9FfNrl3vi6yDSnvEgL6xXRVSYVb0PKkO.jpg', link: '/time-table' },
    { title: 'Syllabus', imgSrc: 'https://freedesignfile.com/upload/2021/03/College-student-cartoon-illustration-vector.jpg', link: '/syllabus' },
    { title: 'Tutorials', imgSrc: 'https://www.pngitem.com/pimgs/m/81-814668_transparent-student-cartoon-png-png-download.png', link: '/tutorials' },
    { title: 'PYQs', imgSrc: 'https://st5.depositphotos.com/1007566/65571/v/450/depositphotos_655718986-stock-illustration-young-adult-businessman-sitting-desk.jpg', link: '/pyqs' },
  ];

  return (
    <div className="exam-corner-card-container">
      {cards.map((card, index) => (
        <div key={index} className="exam-card">
          <img src={card.imgSrc} alt={card.title} className="card-image" />
          <h2>{card.title}</h2>
          <button onClick={() => window.location.href = card.link} className='ec-btn'>Go to {card.title}</button>
        </div>
      ))}
    </div>
  );
};

export default ExamCorner;
