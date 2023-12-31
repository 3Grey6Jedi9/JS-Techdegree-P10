import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';


function CourseDetail() {
  const [course, setCourse] = useState(null);
  const { id } = useParams(); // Use the useParams hook to access route parameters

  useEffect(() => {
    // Function to fetch the course details from your API
    async function fetchCourseDetail() {
  try {
    const response = await axios.get(`http://localhost:5001/api/courses/${id}`);
    if (response.status === 200) {
      const data = response.data;
      setCourse(data);
    } else {
      console.error(`Network response was not ok. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching course details:', error);
  }
}

    fetchCourseDetail();
  }, [id]); // Fetch details when the 'id' parameter changes

  const handleDeleteCourse = async () => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/courses/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Redirect to the Courses screen or perform any other action upon successful deletion
      // You can use history.push here, or any other routing mechanism you're using
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div>
      {course ? (
        <div>
          <h2>Course Detail</h2>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <button onClick={handleDeleteCourse}>Delete Course</button>
          <Link to={`/courses/${course.id}/update`}>Update Course</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CourseDetail;
