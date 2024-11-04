import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './TimeTable.css';

const TimeTable = () => {
  const [selectedTable, setSelectedTable] = useState(1);
  const [tablesData, setTablesData] = useState([]); // Initialize state to hold table data
  const [loading, setLoading] = useState(true); // State to manage loading status

  const handleTableChange = (tableNumber) => {
    setSelectedTable(tableNumber);
  };

  useEffect(() => {
    // Fetch data from timeTableAPI
    const fetchTableData = async () => {
      try {
        const response = await fetch(`https://academiaconnect-x5a6.onrender.com/timeTable-api/syllabus`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTablesData(data); // Set the fetched data into state
      } catch (error) {
        console.error('Error fetching table data:', error);
      } finally {
        setLoading(false); // Set loading to false once data fetching is complete
      }
    };

    fetchTableData();
  }, []); // Empty dependency array to run only once on component mount

  if (loading) {
    return <div className="loading">Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <div className="time-table-app">
      <h2 className="time-table-heading">TimeTable</h2> {/* Added heading here */}
      
      <div className="time-table-button-container">
        {tablesData.map((table, index) => (
          <button
            key={index}
            className={selectedTable === index + 1 ? 'active' : ''}
            onClick={() => handleTableChange(index + 1)}
          >
            Sem {index + 1} {/* Update to show "Sem 1", "Sem 2", etc. */}
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
                {tablesData[selectedTable - 1].data.map((item, itemIndex) => (
                  <tr key={itemIndex}>
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTable;
