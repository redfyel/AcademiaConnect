import React, { useState, useEffect, useContext } from "react";
import { Pie } from "react-chartjs-2";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Tracker.css";
import { userLoginContext } from '../../contexts/userLoginContext';

ChartJS.register(ArcElement, Tooltip, Legend);

function Tracker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [presentHours, setPresentHours] = useState(0);
  const [absentHours, setAbsentHours] = useState(0);
  const [holidayDays, setHolidayDays] = useState(0);
  const [markedDates, setMarkedDates] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { currentUser } = useContext(userLoginContext);
  
  // Assuming roll_num is part of currentUser
  const roll_num = currentUser?.roll_num; 

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`http://localhost:4000/attendance-api/attendance`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        const data = await response.json();
        if (response.ok) {
          setPresentHours(data.presentHours || 0);
          setAbsentHours(data.absentHours || 0);
          setMarkedDates(data.markedDates || {});
        }
      } catch (error) {
        console.error("Error fetching attendance data", error);
      }
    };

    if (currentUser) {
      fetchAttendanceData();
    }
  }, [currentMonth, currentYear, currentUser]);

  const saveAttendanceData = async () => {
    const attendanceData = {
      presentHours,
      absentHours,
      holidayDays,
      markedDates,
      month: currentMonth,
      year: currentYear,
      roll_num,  // Use roll_num here
    };
  
    try {
      const token = sessionStorage.getItem('token');
      if (!token) throw new Error("No token available for authorization");
  
      const response = await fetch(`http://localhost:4000/attendance-api/save-attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(attendanceData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error("Failed to save attendance");
      }
  
      const result = await response.json();
      console.log("Attendance saved successfully:", result);
    } catch (error) {
      console.error("Error saving attendance data", error);
    }
  };

  const handleDayClick = (value) => {
    setSelectedDate(value);
    setModalOpen(true);
  };

  const handleStatusChange = (status) => {
    const dayOfWeek = selectedDate.getDay();
    const dateStr = selectedDate.toDateString();

    if (dayOfWeek !== 0) { // Exclude Sundays
      const previousStatus = markedDates[dateStr];
      if (previousStatus) {
        if (previousStatus === "present") setPresentHours((prev) => prev - 7);
        if (previousStatus === "absent") setAbsentHours((prev) => prev - 7);
        if (previousStatus === "holiday") setHolidayDays((prev) => prev - 1);
      }

      if (status === "present") setPresentHours((prev) => prev + 7);
      if (status === "absent") setAbsentHours((prev) => prev + 7);
      if (status === "holiday") setHolidayDays((prev) => prev + 1);

      setMarkedDates((prev) => ({
        ...prev,
        [dateStr]: status,
      }));
    }

    setModalOpen(false);
    saveAttendanceData();
  };

  const tileClassName = ({ date }) => {
    const dateStr = date.toDateString();
    if (date.getDay() === 0) return "sunday";
    if (markedDates[dateStr] === "present") return "present";
    if (markedDates[dateStr] === "absent") return "absent";
    if (markedDates[dateStr] === "holiday") return "holiday";
    return "";
  };

  const totalHours = 30 * 7;  
  const requiredAttendance = 0.75 * totalHours;

  const chartData = {
    labels: ["Present", "Absent", "Remaining"],
    datasets: [
      {
        label: "Attendance",
        data: [
          presentHours,
          absentHours,
          Math.max(requiredAttendance - presentHours, 0),
        ],
        backgroundColor: ["#4caf50", "#f44336", "#ffc107"],
        hoverBackgroundColor: ["#66bb6a", "#ef5350", "#ffca28"],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="tracker-container">
      {!currentUser  ? (
        <div className="auth-error-message">
          <h3>Please Sign Up or Log In to track your attendance</h3>
          <p>
            You need to create an account or log in to save and view your attendance data.
          </p>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <Calendar
              onClickDay={handleDayClick}
              tileClassName={tileClassName}
              minDetail="month"
            />
          </div>
          <div className="col-md-6">
            <div className="stats-section">
              <h3 className="text-center tracker-title">Attendance Tracker</h3>
              <div className="pie-chart-container">
                <Pie data={chartData} />
              </div>
              <div className="cool-stats-container">
                <div className="stat-item">
                  <div className="progress-circle present-circle">
                    {Math.round((presentHours / totalHours) * 100)}%
                  </div>
                  <p>Present: {presentHours / 7} days ({presentHours} hours)</p>
                </div>

                <div className="stat-item">
                  <div className="progress-circle remaining-circle">
                    {Math.round(((requiredAttendance - presentHours) / totalHours) * 100)}%
                  </div>
                  <p>
                    Remaining: {Math.ceil((requiredAttendance - presentHours) / 7)} days ({requiredAttendance - presentHours} hours)
                  </p>
                </div>

                <div className="stat-item">
                  <div className="progress-circle absent-circle">
                    {Math.round((absentHours / totalHours) * 100)}%
                  </div>
                  <p>Absent: {absentHours / 7} days ({absentHours} hours)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Select Status for {selectedDate?.toDateString()}</h3>
            <button className="present-btn" onClick={() => handleStatusChange("present")}>Present</button>
            <button className="absent-btn" onClick={() => handleStatusChange("absent")}>Absent</button>
            <button className="holiday-btn" onClick={() => handleStatusChange("holiday")}>Holiday</button>
            <button className="close-btn" onClick={() => setModalOpen(false)}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tracker;
