const express = require('express');
const attendanceApp = express.Router();
const jwt = require('jsonwebtoken');
attendanceApp.use(express.json());


// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "token expired, please relogin to continue" });
    }
    req.user = user; // Store user info for next middleware
    next();
  });
}
  


// Save or update attendance data
attendanceApp.post('/save-attendance', authenticateToken, async (req, res) => {
  const attendanceCollection = req.app.get('attendanceCollection');
  const { userId, presentHours, absentHours, holidayDays, markedDates, month, year } = req.body;

  try {
    const result = await attendanceCollection.updateOne(
      { userId, month, year },
      { $set: { presentHours, absentHours, holidayDays, markedDates, updatedAt: new Date() } },
      { upsert: true } // Insert if doesn't exist
    );
    res.status(200).json({ message: "Attendance data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving attendance data", error: error.message });
  }
});

// Fetch attendance data for a specific month and year
attendanceApp.get('/attendance', authenticateToken, async (req, res) => {
  const attendanceCollection = req.app.get('attendanceCollection');
  const { month, year } = req.query; 
  const userId = req.user.id;

  try {
    const records = await attendanceCollection.findOne({ userId, month: parseInt(month), year: parseInt(year) });
    res.status(200).json(records || {});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance records', error: error.message });
  }
});

module.exports = attendanceApp;
