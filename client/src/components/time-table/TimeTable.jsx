import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './TimeTable.css';

const TimeTable = () => {
  const [selectedTable, setSelectedTable] = useState(1);
  const [tablesData, setTablesData] = useState([]); 
  const [loading, setLoading] = useState(true); 

  const handleTableChange = (tableNumber) => {
    setSelectedTable(tableNumber);
  };

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetch(`https://academiaconnect-x5a6.onrender.com/timeTable-api/syllabus`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTablesData(data); 
      } catch (error) {
        console.error('Error fetching table data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, []); 

  if (loading) {
    return <div className="loading">Loading...</div>; 
  }

  const now = new Date();
  const upcomingExams = [];
  const completedExams = [];

  // Separate exams into upcoming and completed
  tablesData[selectedTable - 1].data.forEach(item => {
    const examDate = new Date(item.date);
    if (examDate < now) {
      completedExams.push(item); // Past exams
    } else {
      upcomingExams.push(item); // Upcoming exams
    }
  });

  // Sort upcoming exams by date (earliest first)
  upcomingExams.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Combine upcoming and completed exams
  const sortedItems = [...upcomingExams, ...completedExams];

  let nearestExamIndex = null;

  // Find the nearest upcoming exam
  sortedItems.forEach((item, index) => {
    const examDate = new Date(item.date);
    if (examDate >= now && nearestExamIndex === null) {
      nearestExamIndex = index; // Set the index of the nearest upcoming exam
    }
  });

  return (
    <div className="time-table-app">
      <h2 className="time-table-heading">TimeTable</h2>
      
      <div className="time-table-button-container">
        {tablesData.map((table, index) => (
          <button
            key={index}
            className={selectedTable === index + 1 ? 'active' : ''}
            onClick={() => handleTableChange(index + 1)}
          >
            Sem {index + 1}
          </button>
        ))}
      </div>

      <div className="time-table">
        {tablesData[selectedTable - 1] && (
          <div>
            <h2>{tablesData[selectedTable - 1].title}</h2>
            <table className="time-table-custom-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Syllabus</th>
                  <th>Tutorials</th>
                  <th>Past Papers</th>
                </tr>
              </thead>
              <tbody>
                {sortedItems.map((item, itemIndex) => {
                  const examDate = new Date(item.date);
                  let rowClass = '';

                  // Determine row class based on date
                  if (examDate < now) {
                    rowClass = 'exam-done'; // Past exam
                  } else if (itemIndex === nearestExamIndex) {
                    rowClass = 'nearest-exam'; // Nearest upcoming exam
                  }

                  return (
                    <tr key={itemIndex} className={rowClass}>
                      <td>{item.date}</td>
                      <td>{item.subject}</td>
                      <td>
                        <a href={item.syllabus} target="_blank" rel="noopener noreferrer">
                          Syllabus
                        </a>
                      </td>
                      <td>
                        <Link to={item.tutorials}>Tutorials</Link>
                      </td>
                      <td>
                        <Link to={item.pyqs}>Past Papers</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTable;
