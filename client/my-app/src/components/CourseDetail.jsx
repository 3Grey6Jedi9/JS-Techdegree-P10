import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CourseDetail(props) {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Function to fetch the course details from your API
    async function fetchCourseDetail() {
      try {
        const response = await fetch(`http://localhost:5001/api/courses/${props.match.params.id}`); // Update the URL as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    }

    fetchCourseDetail();
  }, [props.match.params.id]); // Fetch details when the course ID in the URL changes

  const handleDeleteCourse = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/courses/${props.match.params.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Redirect to the Courses screen or perform any other action upon successful deletion
      props.history.push('/courses');
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




