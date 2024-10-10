import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentCorner from './components/student-corner/StudentCorner';
import TimeTable from './components/time-table/TimeTable';
import Home from './components/home/Home';
import ExamCorner from './components/exam-corner/ExamCorner';
import Tracker from './components/tracker/Tracker';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Auth from './components/register/Auth';
import EventCalendar from './components/events/EventCalendar';
import UserProfile from './components/user-profile/UserProfile';
import RoutingError from './components/RoutingError'
import RootLayout from './RootLayout';
import Syllabus from './components/syllabus/Syllabus';
import Pyqs from './components/pyqs/Pyqs';
import Tutorials from './components/tutorials/Tutorials';


function App() {
  const browserRouter = createBrowserRouter([
    {
    path: "/",
    element: <RootLayout />,
    errorElement: <RoutingError />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/student-corner",
        element: <StudentCorner />,
      },
      {
        path: "/exam-corner",
        element: <ExamCorner />,
      },
      {
        path: "/tracker",
        element: <Tracker />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: '/auth',
        element: <Auth />,
      },
      {
        path: "/events",
        element: <EventCalendar />,
      },
      {
        path : '/user-profile',
        element : <UserProfile/>
      },
      {
        path: "/time-table",
        element: <TimeTable />,
      },
      {
        path: "/syllabus",
        element: <Syllabus />,
      },
      {
        path: "/tutorials",
        element: <Tutorials />,
      },
      {
        path: "/pyqs",
        element: <Pyqs />,
      },
    ],
  },
]);

return (

  <div className="main">
    <RouterProvider router = {browserRouter} />
  </div>

)
};

export default App;
