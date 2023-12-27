import React, { useEffect, useState } from 'react';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Function to fetch the list of courses from your API
    async function fetchCourses() {
      try {
        const response = await fetch('http://localhost:5001/api/courses'); // Update the URL as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <a href={`/courses/${course.id}`}>{course.title}</a>
          </li>
        ))}
      </ul>
      <a href="/create-course">Create Course</a>
    </div>
  );
}

export default Courses;



