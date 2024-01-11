import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext.jsx';

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const { user, signOut } = useAuth(); // Access the authenticated user and signOut function
  const [isCourseOwner, setIsCourseOwner] = useState(false); // State to track if the user is the course owner

  useEffect(() => {
    // Function to fetch the course details from your API
    async function fetchCourseDetail() {
      try {
        const response = await axios.get(`http://localhost:5001/api/courses/${id}`);
        if (response.status === 200) {
          const data = response.data;
          setCourse(data);

          // Check if the authenticated user's ID matches the course owner's ID
          setIsCourseOwner(user && user.id === data.userId);
        } else {
          console.error(`Network response was not ok. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    }

    fetchCourseDetail();
  }, [id, user]); // Fetch details when the 'id' parameter changes or when the user changes

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

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div>
      {course ? (
        <div>
          <h2>Course Detail</h2>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          {user && isCourseOwner && ( // Check if there's an authenticated user and if they are the course owner
            <div>
              <button onClick={handleDeleteCourse}>Delete Course</button>
              <Link to="update">Update Course</Link>
            </div>
          )}
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CourseDetail;
