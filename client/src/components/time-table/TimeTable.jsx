import React, { useState } from 'react';
import './TimeTable.css';

const TimeTable = () => {
  const [selectedTable, setSelectedTable] = useState(1);

  const handleTableChange = (tableNumber) => {
    setSelectedTable(tableNumber);
  };

  const tablesData = [
    {
      title: 'I B.TECH - I SEMESTER',
      data: [
        { date: '2024-09-10', subject: 'Communicative English I', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/11/cse/20HS1101.pdf', tutorials: '/tutorials/software', pyqs: '/pyqs/software' },
        { date: '2024-09-11', subject: 'Calculus and Linear Algebra', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/11/cse/20BS1101.pdf', tutorials: '/tutorials/dbms', pyqs: '/pyqs/dbms' },
        { date: '2024-09-10', subject: 'Engineering Physics', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/11/cse/20BS1103.pdf', tutorials: '/tutorials/software', pyqs: '/pyqs/software' },
        { date: '2024-09-11', subject: 'Basic Electrical & Electronics Engineering', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/11/cse/20ES1101.pdf', tutorials: '/tutorials/dbms', pyqs: '/pyqs/dbms' },
        { date: '2024-09-10', subject: 'Problem Solving Techniques', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/11/cse/20ES1103.pdf', tutorials: '/tutorials/software', pyqs: '/pyqs/software' },
        { date: '2024-09-11', subject: 'Communicative English I Lab', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/11/cse/20HS1151.pdf', tutorials: '/tutorials/dbms', pyqs: '/pyqs/dbms' },
        { date: '2024-09-10', subject: 'Engineering Physics Lab', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/11/cse/20BS1152.pdf', tutorials: '/tutorials/software', pyqs: '/pyqs/software' },
        { date: '2024-09-11', subject: 'Basic Electrical & Electronics Engineering Lab', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/11/cse/20ES1151.pdf', tutorials: '/tutorials/dbms', pyqs: '/pyqs/dbms' },

      ]
    },
    {
      title: 'I B.TECH - II SEMESTER',
      data: [
        { date: '2024-09-12', subject: 'Communicative English II', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/12/cse/20HS1201.pdf', tutorials: '/tutorials/os', pyqs: '/pyqs/os' },
        { date: '2024-09-13', subject: 'Engineering Chemistry', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/12/cse/20BS1202.pdf', tutorials: '/tutorials/ds', pyqs: '/pyqs/ds' },
        { date: '2024-09-12', subject: 'Probability and Statistics', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/12/cse/20BS1204.pdf', tutorials: '/tutorials/os', pyqs: '/pyqs/os' },
        { date: '2024-09-13', subject: 'Programming for Problem Solving', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/12/cse/20ES1202.pdf', tutorials: '/tutorials/ds', pyqs: '/pyqs/ds' },
        { date: '2024-09-12', subject: 'Engineering Graphics', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/12/cse/20ES1204.pdf', tutorials: '/tutorials/os', pyqs: '/pyqs/os' },
        { date: '2024-09-13', subject: 'Communicative English II Lab', syllabus: '/https://www.pvpsiddhartha.ac.in/autonomous20/12/cse/20HS1251.pdf', tutorials: '/tutorials/ds', pyqs: '/pyqs/ds' },
        { date: '2024-09-12', subject: 'Engineering Chemistry Lab', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/12/cse/20BS1251.pdf', tutorials: '/tutorials/os', pyqs: '/pyqs/os' },
        { date: '2024-09-13', subject: 'Programming for Problem Solving Lab', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/12/cse/20ES1253.pdf', tutorials: '/tutorials/ds', pyqs: '/pyqs/ds' },
        { date: '2024-09-12', subject: 'Life Sciences for Engineers', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/12/cse/20MC1201.pdf', tutorials: '/tutorials/os', pyqs: '/pyqs/os' },

      ]
    },
    {
      title: 'II B.TECH - I SEMESTER',
      data: [
        { date: '2024-09-14', subject: 'Discrete Mathematical Structures', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/21/cse/20BS1303.pdf', tutorials: '/tutorials/algorithms', pyqs: '/pyqs/algorithms' },
      { date: '2024-09-15', subject: 'Fundamentals of Digital Logic Design', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/21/cse/20CS3301.pdf', tutorials: '/tutorials/cn', pyqs: '/pyqs/cn' },
      { date: '2024-09-14', subject: 'Object Oriented Programming through C++', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/21/cse/20CS3302.pdf', tutorials: '/tutorials/algorithms', pyqs: '/pyqs/algorithms' },
      { date: '2024-09-15', subject: 'Computer Organization and Architecture', syllabus: '/https://www.pvpsiddhartha.ac.in/autonomous20/21/cse/20CS3303.pdf',  tutorials: '/tutorials/cn', pyqs: '/pyqs/cn' },
      { date: '2024-09-14', subject: 'Data Structures', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/21/cse/20ES1305.pdf', tutorials: '/tutorials/algorithms', pyqs: '/pyqs/algorithms' },
      { date: '2024-09-15', subject: 'Object Oriented Programming through C++ Lab', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/21/cse/20CS3351.pdf', tutorials: '/tutorials/cn', pyqs: '/pyqs/cn' },
      { date: '2024-09-14', subject: 'Data Structures Lab', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/21/cse/20ES1356.pdf', tutorials: '/tutorials/algorithms', pyqs: '/pyqs/algorithms' },
      { date: '2024-09-15', subject: 'Python Programming', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/21/cse/20CS3352.pdf', tutorials: '/tutorials/cn', pyqs: '/pyqs/cn' },
      { date: '2024-09-14', subject: 'Introduction to Linux Operating System',syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/21/cse/20S08355.pdf', tutorials: '/tutorials/algorithms', pyqs: '/pyqs/algorithms' },
      { date: '2024-09-15', subject: 'Environmental Sciences', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/21/cse/20MC1301.pdf', tutorials: '/tutorials/cn', pyqs: '/pyqs/cn' },
      { date: '2024-09-15', subject: 'Community Service Project', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/21/cse/20CS3391.pdf', tutorials: '/tutorials/cn', pyqs: '/pyqs/cn' }
      ]
    },
    {
      title: 'II B.TECH - II SEMESTER',
      data: [
        { date: '2024-09-16', subject: 'Formal Languages and Automata Theory', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/22/cse/20BS1403.pdf', tutorials: '/tutorials/ml', pyqs: '/pyqs/ml' },
        { date: '2024-09-17', subject: 'Operating Systems', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/22/cse/20CS3401.pdf', tutorials: '/tutorials/ai', pyqs: '/pyqs/ai' },
        { date: '2024-09-16', subject: 'Advanced Data Structures', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/22/cse/20CS3402.pdf', tutorials: '/tutorials/ml', pyqs: '/pyqs/ml' },
        { date: '2024-09-17', subject: 'Design and Analysis of Algorithms', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/22/cse/20CS3403.pdf', tutorials: '/tutorials/ai', pyqs: '/pyqs/ai' },
        { date: '2024-09-16', subject: 'Internet of Things', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/22/cse/20ES1402.pdf', tutorials: '/tutorials/ml', pyqs: '/pyqs/ml' },
        { date: '2024-09-17', subject: 'Internet of Things Lab', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/22/cse/20ES1452.pdf', tutorials: '/tutorials/ai', pyqs: '/pyqs/ai' },
        { date: '2024-09-16', subject: 'Advanced Data Structures through C++ Lab', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/22/cse/20CS3451.pdf', tutorials: '/tutorials/ml', pyqs: '/pyqs/ml' },
        { date: '2024-09-17', subject: 'Design and Analysis of Algorithms Lab', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/22/cse/20CS3452.pdf', tutorials: '/tutorials/ai', pyqs: '/pyqs/ai' },
        { date: '2024-09-16', subject: 'Programming with JAVA', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/22/cse/20SO8454.pdf', tutorials: '/tutorials/ml', pyqs: '/pyqs/ml' },
        { date: '2024-09-17', subject: 'Advanced Python Programming', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/22/CSE/20CS6421.pdf', tutorials: '/tutorials/ai', pyqs: '/pyqs/ai' }
      ]
    },
    {
      title: 'III B.TECH - I SEMESTER',
      data: [
        { date: '2024-09-10', subject: 'Software Engineering', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/31/cse/20MC1501.pdf', tutorials: '/tutorials', pyqs: '/pyqs' },
      { date: '2024-09-11', subject: 'Database Management Systems', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/31/cse/20CS3502.pdf', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-12', subject: 'Computer Networks', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/31/cse/20CS3503.pdf', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-13', subject: 'Design Thinking', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/31/CSE/20ME2501A.pdf', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-14', subject: 'Data Science', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/31/CSE/20CS4501A.pdf', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-14', subject: 'Artificial Intelligence', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/31/CSE/20CS4501D.pdf', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-15', subject: 'Database Management Systems Lab', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/31/cse/20CS3551.pdf', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-15', subject: 'Computer Networks Lab', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/31/cse/20CS3552.pdf', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-15', subject: 'Soft Skills', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/31/cse/20SS8551.pdf', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-15', subject: 'Summer Internship', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/31/cse/20CS3581A.pdf', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-15', subject: 'Constitution of India', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/31/cse/20MC1501.pdf', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-15', subject: 'Advanced Java Programming', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/31/CSE/20CS6522.pdf', tutorials: '/tutorials', pyqs: 'pyqs' }

      ]
    },
    {
      title: 'III B.TECH - II SEMESTER',
      data: [
        { date: '2024-09-20', subject: 'Compiler Design', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/32/cse/20CS3601.pdf', tutorials: '/tutorials/cyber', pyqs: '/pyqs/cyber' },
      { date: '2024-09-21', subject: 'Machine Learning', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/32/cse/20CS3602.pdf', tutorials: '/tutorials/cloud', pyqs: '/pyqs/cloud' },
      { date: '2024-09-20', subject: 'MERN Stack Development', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/32/cse/20CS3603.pdf', tutorials: '/tutorials/cyber', pyqs: '/pyqs/cyber' },
      { date: '2024-09-21', subject: 'Value Engineering', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/32/CSE/20ME2601A.pdf', tutorials: '/tutorials/cloud', pyqs: '/pyqs/cloud' },
      { date: '2024-09-20', subject: 'Block Chain Technology', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/32/CSE/20CS4601C.pdf', tutorials: '/tutorials/cyber', pyqs: '/pyqs/cyber' },
      { date: '2024-09-22', subject: 'Compiler Design Lab', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/32/cse/20CS3651.pdf', tutorials: '/tutorials/data-mining', pyqs: '/pyqs/data-mining' },
      { date: '2024-09-23', subject: 'Machine Learning Lab', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/32/cse/20CS3652.pdf', tutorials: '/tutorials/nlp', pyqs: '/pyqs/nlp' },
      { date: '2024-09-22', subject: 'MERN Stack Development Lab', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/32/cse/20CS3653.pdf', tutorials: '/tutorials/data-mining', pyqs: '/pyqs/data-mining' },
      { date: '2024-09-23', subject: 'Mobile App Development', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/32/cse/20SA8651.pdf', tutorials: '/tutorials/nlp', pyqs: '/pyqs/nlp' },
      { date: '2024-09-22', subject: 'Universal Human Values', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/32/cse/20MC1602.pdf', tutorials: '/tutorials/data-mining', pyqs: '/pyqs/data-mining' },
      { date: '2024-09-21', subject: 'Data Visualization', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/32/CSE/Data%20Visualization.pdf', tutorials: '/tutorials/cloud', pyqs: '/pyqs/cloud' }

      ]
    },
    {
      title: 'IV B.TECH - I SEMESTER',
      data: [
        { date: '2024-09-22', subject: 'Deep Learning', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/41/CSE/20CS4701A.pdf', tutorials: '/tutorials/data-mining', pyqs: '/pyqs/data-mining' },
      { date: '2024-09-23', subject: 'Cloud Computing', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/41/cse/20CS4701C.pdf', tutorials: '/tutorials/nlp', pyqs: '/pyqs/nlp' },
      { date: '2024-09-22', subject: 'Software Project Management', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/41/CSE/20CS4702B.pdf', tutorials: '/tutorials/data-mining', pyqs: '/pyqs/data-mining' },
      { date: '2024-09-23', subject: 'Cyber Security', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/41/CSE/20CS4702C.pdf', tutorials: '/tutorials/nlp', pyqs: '/pyqs/nlp' },
      { date: '2024-09-22', subject: 'User Interface Design', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/41/CSE/20CS4703C.pdf', tutorials: '/tutorials/data-mining', pyqs: '/pyqs/data-mining' },
      { date: '2024-09-23', subject: 'E-WASTE MANAGEMENT', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/41/CSE/20EC2701B.pdf', tutorials: '/tutorials/nlp', pyqs: '/pyqs/nlp' },
      { date: '2024-09-22', subject: 'Environmental Management and Audit', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/41/CSE/20CE2702A.pdf', tutorials: '/tutorials/data-mining', pyqs: '/pyqs/data-mining' },
      { date: '2024-09-23', subject: 'Entrepreneurship Management', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/41/CSE/20HS7701C.pdf', tutorials: '/tutorials/nlp', pyqs: '/pyqs/nlp' },
      { date: '2024-09-24', subject: 'Sales Force Technologies', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/41/CSE/20SA8755.pdf', tutorials: '/tutorials/iot', pyqs: '/pyqs/iot' },
      { date: '2024-09-25', subject: 'Industrial/Research Internship', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/41/CSE/20CS3781B_C.pdf', tutorials: '/tutorials/blockchain', pyqs: '/pyqs/blockchain' },
      { date: '2024-09-24', subject: 'Advanced Mobile Application Development', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/41/CSE/ADVANCED%20MOBILE%20APP%20DEVELOPMENT.pdf', tutorials: '/tutorials/iot', pyqs: '/pyqs/iot' },

      ]
    },
    {
      title: 'IV B.TECH - II SEMESTER',
      data: [
        { date: '2024-09-24', subject: 'Project work, seminar and internship in industry', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/42/cse/.pdf', tutorials: '/tutorials/iot', pyqs: '/pyqs/iot' }

      ]
    }
  ];

  return (
    <div className="time-table-app">
      {/* Buttons */}
      <div className="button-container">
        {tablesData.map((_, index) => (
          <button key={index} onClick={() => handleTableChange(index + 1)}>
            Sem {index + 1}
          </button>
        ))}
      </div>

      {/* Tables */}
      <div className="table-container">
        <h2 className="table-title">{tablesData[selectedTable - 1].title}</h2>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Subject</th>
              <th>Syllabus</th>
              <th>Tutorials</th>
              <th>PYQs</th>
            </tr>
          </thead>
          <tbody>
            {tablesData[selectedTable - 1].data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{row.date}</td>
                <td>{row.subject}</td>
                <td className="syllabus-link"><a href={row.syllabus} target="_blank" rel="noopener noreferrer">Syllabus</a></td>
                <td className="tutorials-link"><a href={row.tutorials}>Tutorials</a></td>
                <td className="pyqs-link"><a href={row.pyqs}>PYQs</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
