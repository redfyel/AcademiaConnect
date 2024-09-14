import React from 'react';
import './TimeTable.css'; 

const TableComponent = () => {
  const tableData = [
    { date: '2024-09-10', subject: 'Software Engineering', tutorials: 'Link 1', pyqs: 'Link 1' },
    { date: '2024-09-11', subject: 'Database Management Systems', tutorials: 'Link 2', pyqs: 'Link 2' },
    { date: '2024-09-12', subject: 'Computer Networks', tutorials: 'Link 3', pyqs: 'Link 3' },
  ];

  return (
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
              <a href="#" title={`Go to ${row.subject} tutorials`}>{row.tutorials}</a>
            </td>
            <td>
              <a href="#" title={`Go to ${row.subject} PYQs`}>{row.pyqs}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
