import React from 'react';
import './ExamCorner.css';
import { useNavigate } from "react-router-dom";

const ExamCorner = () => {
  const cards = [
    { title: 'TimeTable', imgSrc: 'https://media.istockphoto.com/id/1392979115/vector/deadline-and-time-management-vector-art.jpg?s=612x612&w=0&k=20&c=aXE2fJUqsnFaJbIJ-DTzRDXuSNay1M9Hp3UHuYnz1hc=', link: '/time-table' },
    { title: 'Syllabus', imgSrc: 'https://static.vecteezy.com/system/resources/previews/006/801/573/non_2x/project-life-cycle-illustration-vector.jpg', link: '/syllabus' },
    { title: 'Tutorials', imgSrc: 'https://st4.depositphotos.com/34031690/39333/v/450/depositphotos_393337694-stock-illustration-vector-illustration-young-woman-filling.jpg', link: '/tutorials' },
    { title: 'PYQs', imgSrc: 'https://static.vecteezy.com/system/resources/previews/006/584/666/non_2x/graphic-cartoon-character-of-checklist-vector.jpg', link: '/pyqs' },
  ];

  return (
    <div className="exam-corner-card-container container">
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

// additional images
// https://c8.alamy.com/comp/2PK6RAC/getting-an-academic-degree-concept-educational-trajectory-exams-and-tests-graduation-day-school-classroom-exam-timetable-flat-vector-modern-illu-2PK6RAC.jpg
// https://cdni.iconscout.com/illustration/premium/thumb/graduation-exam-paper-illustration-download-in-svg-png-gif-file-formats--examination-mcq-test-pack-school-education-illustrations-6665986.png?f=webp
// https://static.vecteezy.com/system/resources/previews/010/717/767/non_2x/boy-doing-exam-preparation-illustration-concept-on-white-background-vector.jpg
// https://static.vecteezy.com/system/resources/previews/022/163/371/non_2x/concept-of-public-survey-customer-review-rating-or-score-consumer-opinion-market-research-man-with-pencil-filling-out-paper-forms-or-asking-questions-in-questionnaire-flat-illustration-vector.jpg