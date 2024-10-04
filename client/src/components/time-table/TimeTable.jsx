import React from 'react';
import './TimeTable.css';

// Reusable TableComponent that takes data and title as props
const TableComponent = ({ tableData, title }) => {
  return (
    <div className="table-container">
      <h2 className="table-title">{title}</h2> {/* Title for the table */}
      <table className="custom-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>
              <a href="#" title="Click to learn about Subject Name">
                Subject Name
              </a>
            </th>
            <th>
              <a href="#" title="Click to view Tutorials">
                Tutorials
              </a>
            </th>
            <th>
              <a href="#" title="Click to view PYQ's">
                PYQ's
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.subject}</td>
              <td>
                <a href={row.tutorials} title={`Go to ${row.subject} tutorials`}>
                  {row.tutorials}
                </a>
              </td>
              <td>
                <a href={row.pyqs} title={`Go to ${row.subject} PYQs`}>
                  {row.pyqs}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main component that wraps all TableComponents
const TablesWrapper = () => {
  // Data for each table
  const tableContents = [
    {
      title: 'I B.TECH - I SEMESTER',
      data: [
      { date: '2024-09-10', subject: 'Communicative English I', tutorials: '/tutorials/software', pyqs: '/pyqs/software' },
      { date: '2024-09-11', subject: 'Calculus and Linear Algebra', tutorials: '/tutorials/dbms', pyqs: '/pyqs/dbms' },
      { date: '2024-09-10', subject: 'Engineering Physics', tutorials: '/tutorials/software', pyqs: '/pyqs/software' },
      { date: '2024-09-11', subject: 'Basic Electrical & Electronics Engineering', tutorials: '/tutorials/dbms', pyqs: '/pyqs/dbms' },
      { date: '2024-09-10', subject: 'Problem Solving Techniques', tutorials: '/tutorials/software', pyqs: '/pyqs/software' },
      { date: '2024-09-11', subject: 'Communicative English I Lab', tutorials: '/tutorials/dbms', pyqs: '/pyqs/dbms' },
      { date: '2024-09-10', subject: 'Engineering Physics Lab', tutorials: '/tutorials/software', pyqs: '/pyqs/software' },
      { date: '2024-09-11', subject: 'Basic Electrical & Electronics Engineering Lab', tutorials: '/tutorials/dbms', pyqs: '/pyqs/dbms' }
      ],
    },
    {
      title: 'I B.TECH - II SEMESTER',
      data: [
      { date: '2024-09-12', subject: 'Communicative English II', tutorials: '/tutorials/os', pyqs: '/pyqs/os' },
      { date: '2024-09-13', subject: 'Engineering Chemistry', tutorials: '/tutorials/ds', pyqs: '/pyqs/ds' },
      { date: '2024-09-12', subject: 'Probability and Statistics', tutorials: '/tutorials/os', pyqs: '/pyqs/os' },
      { date: '2024-09-13', subject: 'Programming for Problem Solving', tutorials: '/tutorials/ds', pyqs: '/pyqs/ds' },
      { date: '2024-09-12', subject: 'Engineering Graphics', tutorials: '/tutorials/os', pyqs: '/pyqs/os' },
      { date: '2024-09-13', subject: 'Communicative English II Lab', tutorials: '/tutorials/ds', pyqs: '/pyqs/ds' },
      { date: '2024-09-12', subject: 'Engineering Chemistry Lab', tutorials: '/tutorials/os', pyqs: '/pyqs/os' },
      { date: '2024-09-13', subject: 'Programming for Problem Solving Lab', tutorials: '/tutorials/ds', pyqs: '/pyqs/ds' },
      { date: '2024-09-12', subject: 'Life Sciences for Engineers', tutorials: '/tutorials/os', pyqs: '/pyqs/os' }
      ],
    },
    {
      title: 'II B.TECH - I SEMESTER',
      data: [
        { date: '2024-09-14', subject: 'Discrete Mathematical Structures', tutorials: '/tutorials/algorithms', pyqs: '/pyqs/algorithms' },
      { date: '2024-09-15', subject: 'Fundamentals of Digital Logic Design', tutorials: '/tutorials/cn', pyqs: '/pyqs/cn' },
      { date: '2024-09-14', subject: 'Object Oriented Programming through C++', tutorials: '/tutorials/algorithms', pyqs: '/pyqs/algorithms' },
      { date: '2024-09-15', subject: 'Computer Organization and Architecture', tutorials: '/tutorials/cn', pyqs: '/pyqs/cn' },
      { date: '2024-09-14', subject: 'Data Structures', tutorials: '/tutorials/algorithms', pyqs: '/pyqs/algorithms' },
      { date: '2024-09-15', subject: 'Object Oriented Programming through C++ Lab', tutorials: '/tutorials/cn', pyqs: '/pyqs/cn' },
      { date: '2024-09-14', subject: 'Data Structures Lab', tutorials: '/tutorials/algorithms', pyqs: '/pyqs/algorithms' },
      { date: '2024-09-15', subject: 'Python Programming', tutorials: '/tutorials/cn', pyqs: '/pyqs/cn' },
      { date: '2024-09-14', subject: 'Introduction to Linux Operating System', tutorials: '/tutorials/algorithms', pyqs: '/pyqs/algorithms' },
      { date: '2024-09-15', subject: 'Environmental Sciences', tutorials: '/tutorials/cn', pyqs: '/pyqs/cn' },
      { date: '2024-09-15', subject: 'Community Service Project', tutorials: '/tutorials/cn', pyqs: '/pyqs/cn' }
      ],
    },
    {
      title: 'II B.TECH - II SEMESTER',
      data: [
        { date: '2024-09-16', subject: 'Formal Languages and Automata Theory', tutorials: '/tutorials/ml', pyqs: '/pyqs/ml' },
      { date: '2024-09-17', subject: 'Operating Systems', tutorials: '/tutorials/ai', pyqs: '/pyqs/ai' },
      { date: '2024-09-16', subject: 'Advanced Data Structures', tutorials: '/tutorials/ml', pyqs: '/pyqs/ml' },
      { date: '2024-09-17', subject: 'Design and Analysis of Algorithms', tutorials: '/tutorials/ai', pyqs: '/pyqs/ai' },
      { date: '2024-09-16', subject: 'Internet of Things', tutorials: '/tutorials/ml', pyqs: '/pyqs/ml' },
      { date: '2024-09-17', subject: 'Internet of Things Lab', tutorials: '/tutorials/ai', pyqs: '/pyqs/ai' },
      { date: '2024-09-16', subject: 'Advanced Data Structures through C++ Lab', tutorials: '/tutorials/ml', pyqs: '/pyqs/ml' },
      { date: '2024-09-17', subject: 'Design and Analysis of Algorithms Lab', tutorials: '/tutorials/ai', pyqs: '/pyqs/ai' },
      { date: '2024-09-16', subject: 'Programming with JAVA', tutorials: '/tutorials/ml', pyqs: '/pyqs/ml' },
      { date: '2024-09-17', subject: 'Advanced Python Programming', tutorials: '/tutorials/ai', pyqs: '/pyqs/ai' }
      ],
    },
    {
      title: 'III B.TECH - I SEMESTER',
      data: [
        { date: '2024-09-10', subject: 'Software Engineering', tutorials: '/tutorials', pyqs: '/pyqs' },
      { date: '2024-09-11', subject: 'Database Management Systems', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-12', subject: 'Computer Networks', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-13', subject: 'Design Thinking', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-14', subject: 'Data Science', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-14', subject: 'Artificial Intelligence', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-15', subject: 'Database Management Systems Lab', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-15', subject: 'Computer Networks Lab', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-15', subject: 'Soft Skills', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-15', subject: 'Summer Internship', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-15', subject: 'Constitution of India', tutorials: '/tutorials', pyqs: 'pyqs' },
      { date: '2024-09-15', subject: 'Advanced Java Programming', tutorials: '/tutorials', pyqs: 'pyqs' }
      ],
    },
    {
      title: 'III B.TECH - II SEMESTER',
      data: [
        { date: '2024-09-20', subject: 'Compiler Design', tutorials: '/tutorials/cyber', pyqs: '/pyqs/cyber' },
      { date: '2024-09-21', subject: 'Machine Learning', tutorials: '/tutorials/cloud', pyqs: '/pyqs/cloud' },
      { date: '2024-09-20', subject: 'MERN Stack Development', tutorials: '/tutorials/cyber', pyqs: '/pyqs/cyber' },
      { date: '2024-09-21', subject: 'Value Engineering', tutorials: '/tutorials/cloud', pyqs: '/pyqs/cloud' },
      { date: '2024-09-20', subject: 'Block Chain Technology', tutorials: '/tutorials/cyber', pyqs: '/pyqs/cyber' },
      { date: '2024-09-22', subject: 'Compiler Design Lab', tutorials: '/tutorials/data-mining', pyqs: '/pyqs/data-mining' },
      { date: '2024-09-23', subject: 'Machine Learning Lab', tutorials: '/tutorials/nlp', pyqs: '/pyqs/nlp' },
      { date: '2024-09-22', subject: 'MERN Stack Development Lab', tutorials: '/tutorials/data-mining', pyqs: '/pyqs/data-mining' },
      { date: '2024-09-23', subject: 'Mobile App Development', tutorials: '/tutorials/nlp', pyqs: '/pyqs/nlp' },
      { date: '2024-09-22', subject: 'Universal Human Values', tutorials: '/tutorials/data-mining', pyqs: '/pyqs/data-mining' },
      { date: '2024-09-21', subject: 'Data Visualization', tutorials: '/tutorials/cloud', pyqs: '/pyqs/cloud' }
      ],
    },
    {
      title: 'IV B.TECH - I SEMESTER',
      data: [
        { date: '2024-09-22', subject: 'Deep Learning', tutorials: '/tutorials/data-mining', pyqs: '/pyqs/data-mining' },
      { date: '2024-09-23', subject: 'Cloud Computing', tutorials: '/tutorials/nlp', pyqs: '/pyqs/nlp' },
      { date: '2024-09-22', subject: 'Software Project Management', tutorials: '/tutorials/data-mining', pyqs: '/pyqs/data-mining' },
      { date: '2024-09-23', subject: 'Cyber Security', tutorials: '/tutorials/nlp', pyqs: '/pyqs/nlp' },
      { date: '2024-09-22', subject: 'User Interface Design', tutorials: '/tutorials/data-mining', pyqs: '/pyqs/data-mining' },
      { date: '2024-09-23', subject: 'E-WASTE MANAGEMENT', tutorials: '/tutorials/nlp', pyqs: '/pyqs/nlp' },
      { date: '2024-09-22', subject: 'Environmental Management and Audit', tutorials: '/tutorials/data-mining', pyqs: '/pyqs/data-mining' },
      { date: '2024-09-23', subject: 'Entrepreneurship Management', tutorials: '/tutorials/nlp', pyqs: '/pyqs/nlp' },
      { date: '2024-09-24', subject: 'Sales Force Technologies', tutorials: '/tutorials/iot', pyqs: '/pyqs/iot' },
      { date: '2024-09-25', subject: 'Industrial/Research Internship', tutorials: '/tutorials/blockchain', pyqs: '/pyqs/blockchain' },
      { date: '2024-09-24', subject: 'Advanced Mobile Application Development', tutorials: '/tutorials/iot', pyqs: '/pyqs/iot' },
      ],
    },
    {
      title: 'IV B.TECH - II SEMESTER',
      data: [
        { date: '2024-09-24', subject: 'Project work, seminar and internship in industry', tutorials: '/tutorials/iot', pyqs: '/pyqs/iot' }
      ],
    }
  ];

  return (
    <div className="tables-wrapper">
      {tableContents.map((table, index) => (
        <TableComponent key={index} title={table.title} tableData={table.data} />
      ))}
    </div>
  );
};

export default TablesWrapper;
