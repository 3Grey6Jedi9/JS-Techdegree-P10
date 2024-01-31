import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext.jsx';
import ReactMarkdown from 'react-markdown';


function CourseDetail() {
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const { user, signOut } = useAuth(); // Access the authenticated user and signOut function
  const [isCourseOwner, setIsCourseOwner] = useState(false); // State to track if the user is the course owner

    const navigate = useNavigate();


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

      // Use window.prompt() to ask for the password
  const userPassword = window.prompt('Enter your password to delete the course:');
  if (!userPassword) {
    // User canceled the prompt
    return;
  }
   const authString = `${user.emailAddress}:${userPassword}`;
   const base64AuthString = btoa(authString);
   const authHeaderValue = `Basic ${base64AuthString}`;


   try {
  const response = await axios.delete(`http://localhost:5001/api/courses/${id}`, {
    headers: {
      Authorization: authHeaderValue,
    },
  });

  if (response.status >= 200 && response.status < 400) {
    // Course deleted successfully, navigate to the courses list
    navigate('/courses');
  } else {
    console.error(`Network response was not ok. Status: ${response.status}`);
  }
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
          <ReactMarkdown>{course.description}</ReactMarkdown>
          <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
          <ReactMarkdown>{course.estimatedTime}</ReactMarkdown>
          {user && isCourseOwner && (
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
