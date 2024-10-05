import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import StudentCorner from './components/student-corner/StudentCorner';
import TimeTable from './components/time-table/TimeTable';
import Home from './components/home/Home';
import ExamCorner from './components/exam-corner/ExamCorner';
import Tracker from './components/tracker/Tracker';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Auth from './components/register/Auth';
import EventCalendar from './components/events/EventCalendar';
import RootLayout from './RootLayout';
import AcademiaChatbot from './components/chatbot/AcademiaChatbot';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Root layout for all routes
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
        path: "/time-table",
        element: <TimeTable />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <AcademiaChatbot /> {/* Chatbot included here for global access */}
    </>
  );
};

export default App;
