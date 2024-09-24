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
import Events from './components/events/Events';
import RootLayout from './RootLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
        path: "/events",
        element: <Events />,
      },
     
      {
        path: "/time-table",
        element: <TimeTable />,
      },
      
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
