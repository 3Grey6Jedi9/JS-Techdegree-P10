import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Courses {...props} courses={courses} />} // Pass the courses prop
        />
        <Route path="/courses/create" component={CreateCourse} />
        <Route path="/courses/:id/update" component={UpdateCourse} />
        <Route path="/courses/:id" component={CourseDetail} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signout" component={UserSignOut} />
      </Switch>
    </Router>
  );
}

export default Routes;
