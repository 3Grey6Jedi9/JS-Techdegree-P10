import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Header from './components/Header'; // Import the Header component
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
import courses from "./components/Courses";
import Forbidden from "./components/Forbidden.jsx";
import NotFound from "./components/NotFound.jsx";
import UnhandledError from "./components/UnhandledError.jsx";


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />

        {/* Protected Routes */}
        <Route
          path="/courses"
          element={
            <PrivateRoute />
          }
        >
          {/* Use relative paths for nested routes */}
          <Route index element={<Courses />} /> {/* Default route */}
          <Route path="create" element={<CreateCourse />} />
          <Route path=":id/update" element={<UpdateCourse courses={courses} />} />
          <Route path=":id" element={<CourseDetail />} />
          <Route path="signout" element={<UserSignOut />} />
        </Route>

        {/* Unprotected Routes */}
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />

        {/* Error Routes */}
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/error" element={<UnhandledError />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}


export default AppRoutes;

