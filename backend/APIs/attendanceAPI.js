const exp = require('express');
const attendanceApp = exp.Router();
const Attendance = require('./models/Attendance');

attendanceApp.post('/attendance', async (req, res) => {
  try {
    const { userId, attendance } = req.body;
    const newAttendance = new Attendance({ userId, attendance });
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


attendanceApp.get('/attendance', async (req, res) => {
  try {
    const records = await Attendance.find(); 
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = attendanceApp;
