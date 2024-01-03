import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Courses() { // No need to receive courses as a prop
  const [courses, setCourses] = useState([]);

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

  return (
    <div>
      <h2>List of Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <a href={`/courses/${course.id}`}>{course.title}</a>
          </li>
        ))}
      </ul>
      <a href="/courses/create">Create Course</a>
    </div>
  );
}

export default Courses;
