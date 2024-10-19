import React from 'react'
import Tracker from '../tracker/Tracker'; // Make sure the path is correct
import StudentCorner from '../student-corner/StudentCorner';
import EventCalendar from '../events/EventCalendar';
import './UserProfile.css'; // Import CSS for styling

function UserProfile() {
  return (
    
    <div>UserProfile
      
      <body>
        <Tracker />
        <StudentCorner />
        <EventCalendar />
      </body>
    </div>

  )
}


export default UserProfile