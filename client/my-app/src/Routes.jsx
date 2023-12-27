import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

function AppRoutes({ courses }) {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Courses courses={courses} />} // Pass the 'courses' prop
        />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/:id/update" element={<UpdateCourse />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
