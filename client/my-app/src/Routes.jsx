import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header'; // Import the Header component
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import courses from "./components/Courses";

function AppRoutes() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Header />} />
        <Route
          path="/courses"
          element={<Courses />}
        />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/:id/update" element={<UpdateCourse courses={courses}/>} />
        <Route
          path="/courses/:id"
          element={<CourseDetail />}
        />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

