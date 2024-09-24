const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true,
  },
  attendance: {
    type: Map,
    of: String, 
  },
  presentHours: {
    type: Number,
    default: 0,
  },
  absentHours: {
    type: Number,
    default: 0,
  },
  holidayDays: {
    type: Number,
    default: 0,
  },
  previousMonths: {
    type: [{
      month: String,
      presentHours: Number,
      totalHours: Number,
    }],
    default: [],
  },
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
// module.exports = mongoose.model('Attendance', AttendanceSchema);