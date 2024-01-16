import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useAuth} from "../AuthContext.jsx"; // Importing the useAuth hook

function Courses() { // No need to receive courses as a prop
  const [courses, setCourses] = useState([]);
  const {signOut} = useAuth(); // Accessing the signOut function from the authentication context

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

    <div>
      <h2>List of Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="create">Create Course</Link>
      <button onClick={handleSignOut}>Sign Out</button> {/* Adding the Sign Out button */}
    </div>

  );
}

export default Courses;
