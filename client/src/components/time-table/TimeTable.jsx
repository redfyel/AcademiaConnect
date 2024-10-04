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
            <th>Subject Name</th>
            <th>Tutorials</th>
            <th>PYQ's</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              {/* Subject name linked to the syllabus */}
              <td>
                <a href={row.syllabus} title={`View the syllabus for ${row.subject}`} target='_blank'>
                  {row.subject}
                </a>
              </td>
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
        { date: '2024-09-10', subject: 'Communicative English I', syllabus: 'https://www.pvpsiddhartha.ac.in/autonomous20/11/cse/20HS1101.pdf', tutorials: '/tutorials/software', pyqs: '/pyqs/software' },
        { date: '2024-09-11', subject: 'Calculus and Linear Algebra', syllabus: '/syllabus/calculus-linear-algebra', tutorials: '/tutorials/dbms', pyqs: '/pyqs/dbms' },
        { date: '2024-09-10', subject: 'Engineering Physics', syllabus: '/syllabus/engineering-physics', tutorials: '/tutorials/software', pyqs: '/pyqs/software' },
        { date: '2024-09-11', subject: 'Basic Electrical & Electronics Engineering', syllabus: '/syllabus/bee', tutorials: '/tutorials/dbms', pyqs: '/pyqs/dbms' },
        { date: '2024-09-10', subject: 'Problem Solving Techniques', syllabus: '/syllabus/problem-solving', tutorials: '/tutorials/software', pyqs: '/pyqs/software' },
        { date: '2024-09-11', subject: 'Communicative English I Lab', syllabus: '/syllabus/ce-lab', tutorials: '/tutorials/dbms', pyqs: '/pyqs/dbms' },
        { date: '2024-09-10', subject: 'Engineering Physics Lab', syllabus: '/syllabus/ep-lab', tutorials: '/tutorials/software', pyqs: '/pyqs/software' },
        { date: '2024-09-11', subject: 'Basic Electrical & Electronics Engineering Lab', syllabus: '/syllabus/bee-lab', tutorials: '/tutorials/dbms', pyqs: '/pyqs/dbms' },
      ],
    },
    {
      title: 'I B.TECH - II SEMESTER',
      data: [
        { date: '2024-09-12', subject: 'Communicative English II', syllabus: '/syllabus/communicative-english-2', tutorials: '/tutorials/os', pyqs: '/pyqs/os' },
        { date: '2024-09-13', subject: 'Engineering Chemistry', syllabus: '/syllabus/engineering-chemistry', tutorials: '/tutorials/ds', pyqs: '/pyqs/ds' },
        { date: '2024-09-12', subject: 'Probability and Statistics', syllabus: '/syllabus/probability-statistics', tutorials: '/tutorials/os', pyqs: '/pyqs/os' },
        { date: '2024-09-13', subject: 'Programming for Problem Solving', syllabus: '/syllabus/programming-problem-solving', tutorials: '/tutorials/ds', pyqs: '/pyqs/ds' },
        { date: '2024-09-12', subject: 'Engineering Graphics', syllabus: '/syllabus/engineering-graphics', tutorials: '/tutorials/os', pyqs: '/pyqs/os' },
        { date: '2024-09-13', subject: 'Communicative English II Lab', syllabus: '/syllabus/ce-lab-2', tutorials: '/tutorials/ds', pyqs: '/pyqs/ds' },
        { date: '2024-09-12', subject: 'Engineering Chemistry Lab', syllabus: '/syllabus/ec-lab', tutorials: '/tutorials/os', pyqs: '/pyqs/os' },
        { date: '2024-09-13', subject: 'Programming for Problem Solving Lab', syllabus: '/syllabus/pps-lab', tutorials: '/tutorials/ds', pyqs: '/pyqs/ds' },
        { date: '2024-09-12', subject: 'Life Sciences for Engineers', syllabus: '/syllabus/life-sciences', tutorials: '/tutorials/os', pyqs: '/pyqs/os' },
      ],
    },
    {
      title: 'II B.TECH - I SEMESTER',
      data: [
        { date: '2024-09-14', subject: 'Data Structures', syllabus: '/syllabus/data-structures', tutorials: '/tutorials/data-structures', pyqs: '/pyqs/data-structures' },
        { date: '2024-09-15', subject: 'Database Management Systems', syllabus: '/syllabus/dbms', tutorials: '/tutorials/dbms', pyqs: '/pyqs/dbms' },
        { date: '2024-09-14', subject: 'Operating Systems', syllabus: '/syllabus/operating-systems', tutorials: '/tutorials/os', pyqs: '/pyqs/os' },
        { date: '2024-09-15', subject: 'Discrete Mathematics', syllabus: '/syllabus/discrete-mathematics', tutorials: '/tutorials/discrete-mathematics', pyqs: '/pyqs/discrete-mathematics' },
        { date: '2024-09-14', subject: 'Object Oriented Programming', syllabus: '/syllabus/oop', tutorials: '/tutorials/oop', pyqs: '/pyqs/oop' },
        { date: '2024-09-15', subject: 'Data Structures Lab', syllabus: '/syllabus/data-structures-lab', tutorials: '/tutorials/data-structures-lab', pyqs: '/pyqs/data-structures-lab' },
        { date: '2024-09-14', subject: 'Database Management Systems Lab', syllabus: '/syllabus/dbms-lab', tutorials: '/tutorials/dbms-lab', pyqs: '/pyqs/dbms-lab' },
        { date: '2024-09-15', subject: 'Operating Systems Lab', syllabus: '/syllabus/os-lab', tutorials: '/tutorials/os-lab', pyqs: '/pyqs/os-lab' },
      ],
    },
    {
      title: 'II B.TECH - II SEMESTER',
      data: [
        { date: '2024-09-16', subject: 'Design and Analysis of Algorithms', syllabus: '/syllabus/daa', tutorials: '/tutorials/daa', pyqs: '/pyqs/daa' },
        { date: '2024-09-17', subject: 'Computer Networks', syllabus: '/syllabus/computer-networks', tutorials: '/tutorials/cn', pyqs: '/pyqs/cn' },
        { date: '2024-09-16', subject: 'Software Engineering', syllabus: '/syllabus/software-engineering', tutorials: '/tutorials/se', pyqs: '/pyqs/se' },
        { date: '2024-09-17', subject: 'Microprocessors and Interfacing', syllabus: '/syllabus/microprocessors', tutorials: '/tutorials/microprocessors', pyqs: '/pyqs/microprocessors' },
        { date: '2024-09-16', subject: 'Environmental Science', syllabus: '/syllabus/environmental-science', tutorials: '/tutorials/env-science', pyqs: '/pyqs/env-science' },
        { date: '2024-09-17', subject: 'Design and Analysis of Algorithms Lab', syllabus: '/syllabus/daa-lab', tutorials: '/tutorials/daa-lab', pyqs: '/pyqs/daa-lab' },
        { date: '2024-09-16', subject: 'Computer Networks Lab', syllabus: '/syllabus/cn-lab', tutorials: '/tutorials/cn-lab', pyqs: '/pyqs/cn-lab' },
        { date: '2024-09-17', subject: 'Software Engineering Lab', syllabus: '/syllabus/se-lab', tutorials: '/tutorials/se-lab', pyqs: '/pyqs/se-lab' },
      ],
    },
    {
      title: 'III B.TECH - I SEMESTER',
      data: [
        { date: '2024-09-18', subject: 'Compiler Design', syllabus: '/syllabus/compiler-design', tutorials: '/tutorials/compiler-design', pyqs: '/pyqs/compiler-design' },
        { date: '2024-09-19', subject: 'Computer Graphics', syllabus: '/syllabus/computer-graphics', tutorials: '/tutorials/computer-graphics', pyqs: '/pyqs/computer-graphics' },
        { date: '2024-09-18', subject: 'Artificial Intelligence', syllabus: '/syllabus/ai', tutorials: '/tutorials/ai', pyqs: '/pyqs/ai' },
        { date: '2024-09-19', subject: 'Embedded Systems', syllabus: '/syllabus/embedded-systems', tutorials: '/tutorials/embedded-systems', pyqs: '/pyqs/embedded-systems' },
        { date: '2024-09-18', subject: 'Elective - Data Mining', syllabus: '/syllabus/data-mining', tutorials: '/tutorials/data-mining', pyqs: '/pyqs/data-mining' },
        { date: '2024-09-19', subject: 'Compiler Design Lab', syllabus: '/syllabus/compiler-design-lab', tutorials: '/tutorials/compiler-design-lab', pyqs: '/pyqs/compiler-design-lab' },
        { date: '2024-09-18', subject: 'Computer Graphics Lab', syllabus: '/syllabus/computer-graphics-lab', tutorials: '/tutorials/computer-graphics-lab', pyqs: '/pyqs/computer-graphics-lab' },
        { date: '2024-09-19', subject: 'Artificial Intelligence Lab', syllabus: '/syllabus/ai-lab', tutorials: '/tutorials/ai-lab', pyqs: '/pyqs/ai-lab' },
      ],
    },
    {
      title: 'III B.TECH - II SEMESTER',
      data: [
        { date: '2024-09-20', subject: 'Mobile Computing', syllabus: '/syllabus/mobile-computing', tutorials: '/tutorials/mobile-computing', pyqs: '/pyqs/mobile-computing' },
        { date: '2024-09-21', subject: 'Big Data', syllabus: '/syllabus/big-data', tutorials: '/tutorials/big-data', pyqs: '/pyqs/big-data' },
        { date: '2024-09-20', subject: 'Internet of Things', syllabus: '/syllabus/iot', tutorials: '/tutorials/iot', pyqs: '/pyqs/iot' },
        { date: '2024-09-21', subject: 'Elective - Cloud Computing', syllabus: '/syllabus/cloud-computing', tutorials: '/tutorials/cloud-computing', pyqs: '/pyqs/cloud-computing' },
        { date: '2024-09-20', subject: 'Mobile Computing Lab', syllabus: '/syllabus/mobile-computing-lab', tutorials: '/tutorials/mobile-computing-lab', pyqs: '/pyqs/mobile-computing-lab' },
        { date: '2024-09-21', subject: 'Big Data Lab', syllabus: '/syllabus/big-data-lab', tutorials: '/tutorials/big-data-lab', pyqs: '/pyqs/big-data-lab' },
        { date: '2024-09-20', subject: 'Internet of Things Lab', syllabus: '/syllabus/iot-lab', tutorials: '/tutorials/iot-lab', pyqs: '/pyqs/iot-lab' },
      ],
    },
  ];

  
  return (
    <div className="tables-wrapper container">
      {tableContents.map((table, index) => (
        <TableComponent key={index} title={table.title} tableData={table.data} />
      ))}
    </div>
  );
};

export default TablesWrapper;
