import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useAuth} from "../AuthContext.jsx"; // Importing the useAuth hook
import '../styles/courses.css'

function Courses() { // No need to receive courses as a prop
  const [courses, setCourses] = useState([]);
  const {signOut, user} = useAuth(); // Accessing the signOut function from the authentication context

  useEffect(() => {
    // Function to fetch the list of courses from your API
    async function fetchCourses() {
      try {
        const response = await axios.get('http://localhost:5001/api/courses');
        setCourses(response.data); // Use response.data to set courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  const handleSignOut = () => {

      signOut(); // Calling the signOut function to sign out the user


  }

  return (
    <div className="courses-container">
       <div className="courses-header">
         <h2 className="courses-title">Courses</h2>
         <h4>Welcome, {user.firstName} {user.lastName}!</h4>
        <button onClick={handleSignOut} className="signout-button">Sign Out</button>
    </div>
      <ul className="courses-list">
        {courses.map((course) => (
          <li key={course.id}>
            <div className="course-box">
              <Link to={`/courses/${course.id}`}>
              <div className="course-name">Course {course.id}</div>
                  <div className="course-title">{course.title}</div>
              </Link>
            </div>
          </li>
        ))}
          <Link to="create" className="course-box">+ Create a New Course +</Link>
      </ul>
    </div>
  );
}

export default Courses;
